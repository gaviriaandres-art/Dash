
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SummaryDashboard from './pages/SummaryDashboard';
import HistoricalDashboard from './pages/HistoricalDashboard';
import CurrentMonthDashboard from './pages/CurrentMonthDashboard';

const App: React.FC = () => {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to="/summary" replace />} />
                    <Route path="/summary" element={<SummaryDashboard />} />
                    <Route path="/historical" element={<HistoricalDashboard />} />
                    <Route path="/current-month" element={<CurrentMonthDashboard />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

export default App;
