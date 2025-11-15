
import React from 'react';
import { Link } from 'react-router-dom';
import { ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../utils/formatters';
import { useSalesData } from '../hooks/useSalesData';
import { getHistoricalSales, getCurrentMonthSales } from '../services/googleSheetsService';
import DashboardCard from '../components/ui/DashboardCard';
import Spinner from '../components/ui/Spinner';
import { KPI } from '../types';


const SummaryDashboard: React.FC = () => {
    const { data: historicalData, loading: loadingHistorical, error: errorHistorical } = useSalesData(getHistoricalSales);
    const { data: currentMonthData, loading: loadingCurrent, error: errorCurrent } = useSalesData(getCurrentMonthSales);

    if (loadingHistorical || loadingCurrent) {
        return <div className="h-full w-full flex items-center justify-center"><Spinner /></div>;
    }
    
    if (errorHistorical || errorCurrent) {
        return <div className="text-red-500 text-center">{errorHistorical || errorCurrent}</div>;
    }

    const totalHistoricalSales = historicalData.reduce((sum, sale) => sum + sale.valorVenta, 0);
    const totalCurrentMonthSales = currentMonthData.reduce((sum, sale) => sum + sale.valorVenta, 0);
    const totalTransactions = historicalData.length + currentMonthData.length;

    const kpis: KPI[] = [
        { label: "Ventas Totales (Histórico)", value: formatCurrency(totalHistoricalSales) },
        { label: "Ventas Mes Actual", value: formatCurrency(totalCurrentMonthSales) },
        { label: "Total Transacciones", value: totalTransactions.toString() },
    ];
    
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpis.map(kpi => <DashboardCard key={kpi.label} kpi={kpi} />)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-light-card dark:bg-dark-card p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                    <ChartBarIcon className="w-16 h-16 mx-auto text-primary" />
                    <h2 className="text-2xl font-bold mt-4">Análisis Histórico</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Explore tendencias, compare años y analice el rendimiento de productos, vendedores y sedes a lo largo del tiempo.</p>
                    <Link to="/historical" className="mt-4 inline-block bg-primary text-white font-bold py-2 px-4 rounded hover:bg-blue-800 transition-colors">
                        Ir a Históricos
                    </Link>
                </div>

                <div className="bg-light-card dark:bg-dark-card p-6 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                    <CalendarIcon className="w-16 h-16 mx-auto text-secondary" />
                    <h2 className="text-2xl font-bold mt-4">Mes en Curso</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Monitoree las ventas diarias, compare el avance contra la meta y vea el ranking de vendedores en tiempo real.</p>
                    <Link to="/current-month" className="mt-4 inline-block bg-secondary text-white font-bold py-2 px-4 rounded hover:bg-pink-700 transition-colors">
                        Ir a Mes Actual
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SummaryDashboard;
