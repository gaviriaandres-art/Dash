
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/solid';

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const getTitle = (pathname: string): string => {
    if (pathname.includes('/historical')) return 'Análisis Histórico de Ventas';
    if (pathname.includes('/current-month')) return 'Dashboard del Mes en Curso';
    if (pathname.includes('/summary')) return 'Resumen General';
    return 'Dashboard de Ventas';
};

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();

    return (
        <header className="sticky top-0 bg-light-card dark:bg-dark-card border-b border-gray-200 dark:border-gray-700 z-30">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 -mb-px">
                    {/* Header: Left side */}
                    <div className="flex items-center">
                        {/* Hamburger button */}
                        <button
                            className="text-gray-500 hover:text-gray-600 lg:hidden"
                            aria-controls="sidebar"
                            aria-expanded={sidebarOpen}
                            onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="w-6 h-6 fill-current" />
                        </button>
                        <h1 className="text-xl md:text-2xl font-bold text-light-text dark:text-dark-text ml-4 lg:ml-0">
                            {getTitle(location.pathname)}
                        </h1>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
