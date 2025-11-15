
import React, { useMemo } from 'react';
import { useSalesData } from '../hooks/useSalesData';
import { getCurrentMonthSales } from '../services/googleSheetsService';
import Spinner from '../components/ui/Spinner';
import DashboardCard from '../components/ui/DashboardCard';
import { KPI, CurrentMonthSale } from '../types';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import SalesLineChart from '../components/charts/SalesLineChart';
import SalesBarChart from '../components/charts/SalesBarChart';

const MONTHLY_GOAL = 100000000; // Meta mensual de ejemplo

const processCurrentMonthData = (data: CurrentMonthSale[]) => {
    if (!data || data.length === 0) return { kpis: [], salesByDay: [], salesByVendedor: [] };

    const today = new Date();
    const totalDaysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    const accumulatedSales = data.reduce((sum, sale) => sum + sale.valorVenta, 0);
    const goalAchieved = accumulatedSales / MONTHLY_GOAL;
    const avgDailySales = accumulatedSales / today.getDate();
    const projection = avgDailySales * totalDaysInMonth;

    const kpis: KPI[] = [
        { label: "Ventas Acumuladas del Mes", value: formatCurrency(accumulatedSales) },
        { label: "Cumplimiento de Meta", value: formatPercentage(goalAchieved) },
        { label: "Proyección Cierre de Mes", value: formatCurrency(projection) },
        { label: "Venta Promedio Diaria", value: formatCurrency(avgDailySales) },
    ];

    const salesByDay = Array.from(
        data.reduce((map, sale) => {
            const day = sale.fecha.getDate();
            map.set(day, (map.get(day) || 0) + sale.valorVenta);
            return map;
        }, new Map<number, number>()),
        ([day, Ventas]) => ({ name: `Día ${day}`, Ventas })
    ).sort((a,b) => parseInt(a.name.split(' ')[1]) - parseInt(b.name.split(' ')[1]));

    const salesByVendedor = Array.from(
        data.reduce((map, sale) => {
            map.set(sale.vendedor, (map.get(sale.vendedor) || 0) + sale.valorVenta);
            return map;
        }, new Map<string, number>()),
        ([name, Ventas]) => ({ name, Ventas })
    ).sort((a,b) => b.Ventas - a.Ventas);

    return { kpis, salesByDay, salesByVendedor };
};


const CurrentMonthDashboard: React.FC = () => {
    const { data, loading, error } = useSalesData(getCurrentMonthSales);
    
    const { kpis, salesByDay, salesByVendedor } = useMemo(() => processCurrentMonthData(data), [data]);

    if (loading) return <div className="h-full w-full flex items-center justify-center"><Spinner /></div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map(kpi => <DashboardCard key={kpi.label} kpi={kpi} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <SalesLineChart data={salesByDay} dataKey="Ventas" xAxisKey="name" title="Ventas Diarias del Mes" />
                 <SalesBarChart data={salesByVendedor.slice(0, 10)} dataKey="Ventas" xAxisKey="name" title="Top 10 Vendedores del Mes" />
            </div>

        </div>
    );
};

export default CurrentMonthDashboard;
