
import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';
import { KPI } from '../../types';

interface DashboardCardProps {
  kpi: KPI;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ kpi }) => {
    const { label, value, change, changeType } = kpi;

    return (
        <div className="bg-light-card dark:bg-dark-card p-5 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{label}</h3>
            <div className="mt-1 text-3xl font-semibold text-light-text dark:text-dark-text">{value}</div>
            {change && (
                <div className="mt-1 flex items-center text-sm">
                    {changeType === 'increase' ? (
                        <ArrowUpIcon className="w-4 h-4 text-green-500" />
                    ) : (
                        <ArrowDownIcon className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`ml-1 ${changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>{change}</span>
                    <span className="ml-1 text-gray-500 dark:text-gray-400">vs anterior</span>
                </div>
            )}
        </div>
    );
};

export default DashboardCard;
