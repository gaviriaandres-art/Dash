
import React, { useMemo } from 'react';
import { useSalesData } from '../hooks/useSalesData';
import { getHistoricalSales } from '../services/googleSheetsService';
import Spinner from '../components/ui/Spinner';
import DashboardCard from '../components/ui/DashboardCard';
import { KPI, HistoricalSale } from '../types';
import { formatCurrency, formatNumber, formatPercentage } from '../utils/formatters';
import SalesBarChart from '../components/charts/SalesBarChart';
import SalesLineChart from '../components/charts/SalesLineChart';

const processHistoricalData = (data: HistoricalSale[]) => {
    if (!data || data.length === 0) return { kpis: [], salesByYear: [], salesByMonth: [], salesBySede: [] };

    const totalSales = data.reduce((sum, sale) => sum + sale.valorVenta, 0);
    const totalCost = data.reduce((sum, sale) => sum + sale.costo, 0);
    const grossMargin = totalSales - totalCost;
    const grossMarginPercentage = totalSales > 0 ? grossMargin / totalSales : 0;
    const avgTicket = totalSales / data.length;

    const kpis: KPI[] = [
        { label: "Ventas Totales", value: formatCurrency(totalSales) },
        { label: "Margen Bruto", value: formatCurrency(grossMargin) },
        { label: "Margen %", value: formatPercentage(grossMarginPercentage) },
        { label: "Ticket Promedio", value: formatCurrency(avgTicket) },
    ];
    
    const salesByYear = Array.from(
        data.reduce((map, sale) => {
            map.set(sale.ano, (map.get(sale.ano) || 0) + sale.valorVenta);
            return map;
        }, new Map<number, number>()),
        ([name, Ventas]) => ({ name: name.toString(), Ventas })
    ).sort((a, b) => a.name.localeCompare(b.name));

    const salesByMonth = Array.from(
        data.reduce((map, sale) => {
            const monthName = new Date(sale.ano, sale.mes - 1).toLocaleString('es-CO', { month: 'short' });
            const yearMonth = `${sale.ano}-${sale.mes.toString().padStart(2, '0')}`;
            map.set(yearMonth, {
                Ventas: (map.get(yearMonth)?.Ventas || 0) + sale.valorVenta,
                name: `${monthName.toUpperCase()} ${sale.ano}`
            });
            return map;
        }, new Map<string, { Ventas: number, name: string }>()),
        ([key, value]) => ({...value})
    ).sort((a,b) => a.name.localeCompare(b.name));


    const salesBySede = Array.from(
        data.reduce((map, sale) => {
            map.set(sale.sede, (map.get(sale.sede) || 0) + sale.valorVenta);
            return map;
        }, new Map<string, number>()),
        ([name, Ventas]) => ({ name, Ventas })
    );

    return { kpis, salesByYear, salesByMonth, salesBySede };
};

const HistoricalDashboard: React.FC = () => {
    const { data, loading, error } = useSalesData(getHistoricalSales);

    const { kpis, salesByYear, salesByMonth, salesBySede } = useMemo(() => processHistoricalData(data), [data]);

    if (loading) return <div className="h-full w-full flex items-center justify-center"><Spinner /></div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map(kpi => <DashboardCard key={kpi.label} kpi={kpi} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesBarChart data={salesByYear} dataKey="Ventas" xAxisKey="name" title="Ventas por Año" />
                <SalesBarChart data={salesBySede} dataKey="Ventas" xAxisKey="name" title="Ventas por Sede" />
            </div>
            
            <div>
                 <SalesLineChart data={salesByMonth} dataKey="Ventas" xAxisKey="name" title="Ventas por Mes" />
            </div>

        </div>
    );
};

export default HistoricalDashboard;
