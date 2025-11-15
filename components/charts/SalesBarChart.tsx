
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartData } from '../../types';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface SalesBarChartProps {
    data: ChartData[];
    dataKey: string;
    xAxisKey: string;
    title: string;
    unit?: 'currency' | 'number';
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        const formattedValue = unit === 'currency' ? formatCurrency(value) : formatNumber(value);
        return (
            <div className="bg-white dark:bg-gray-800 p-2 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
                <p className="label font-bold text-light-text dark:text-dark-text">{`${label}`}</p>
                <p className="intro text-primary">{`${payload[0].name}: ${formattedValue}`}</p>
            </div>
        );
    }
    return null;
};


const SalesBarChart: React.FC<SalesBarChartProps> = ({ data, dataKey, xAxisKey, title, unit = 'currency' }) => {
    return (
        <div className="bg-light-card dark:bg-dark-card p-5 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 h-96">
            <h3 className="text-lg font-semibold mb-4 text-light-text dark:text-dark-text">{title}</h3>
            <ResponsiveContainer width="100%" height="90%">
                <BarChart data={data} margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey={xAxisKey} tick={{ fill: '#6B7280' }} />
                    <YAxis tickFormatter={(value) => unit === 'currency' ? `${formatCurrency(Number(value)/1000000)}M` : formatNumber(Number(value))} tick={{ fill: '#6B7280' }}/>
                    <Tooltip content={<CustomTooltip unit={unit} />} />
                    <Legend />
                    <Bar dataKey={dataKey} fill="#1E40AF" name="Ventas" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesBarChart;
