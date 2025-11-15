
import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChartBarIcon, CalendarIcon, HomeIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const { pathname } = location;

    const trigger = useRef<HTMLButtonElement>(null);
    const sidebar = useRef<HTMLDivElement>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (!sidebarOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <>
            {/* Sidebar backdrop (mobile) */}
            <div
                className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <div
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-auto no-scrollbar w-64 lg:w-20 lg:hover:w-64 shrink-0 bg-primary p-4 transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-64'
                }`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                     <div className="flex items-center text-white">
                        <svg className="w-8 h-8 fill-current text-secondary" viewBox="0 0 32 32">
                           <path d="M31.952 14.751a260.51 260.51 0 00-4.359-4.407C23.932 6.734 20.16 3.182 16.171 0c-3.989 3.182-7.76 6.734-11.422 10.344-4.359 4.407-4.359 4.407-4.359 4.407l11.422 11.422 11.422-11.422zM16.171 28.229l-11.422-11.422a260.51 260.51 0 004.359 4.407c3.662 3.613 7.434 7.165 11.422 10.344-3.989-3.182-7.76-6.734-11.422-10.344-4.359-4.407-4.359-4.407-4.359-4.407z"></path>
                        </svg>
                        <h1 className="text-xl font-bold ml-3 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">VentasPRO</h1>
                     </div>
                </div>

                {/* Links */}
                <ul className="space-y-2">
                    <NavItem to="/summary" label="Resumen General" icon={<HomeIcon className="w-6 h-6"/>} currentPath={pathname} />
                    <NavItem to="/historical" label="Análisis Histórico" icon={<ChartBarIcon className="w-6 h-6"/>} currentPath={pathname} />
                    <NavItem to="/current-month" label="Mes en Curso" icon={<CalendarIcon className="w-6 h-6"/>} currentPath={pathname} />
                </ul>
            </div>
        </>
    );
};

interface NavItemProps {
    to: string;
    label: string;
    icon: React.ReactElement;
    currentPath: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, currentPath }) => {
    const isActive = currentPath.includes(to);
    return (
        <li>
            <NavLink
                to={to}
                className={`flex items-center p-2 rounded-md text-gray-200 hover:bg-white/20 transition-colors duration-200 ${isActive ? 'bg-white/30' : ''}`}
            >
                {icon}
                <span className="ml-4 font-medium lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">{label}</span>
            </NavLink>
        </li>
    );
}

export default Sidebar;
