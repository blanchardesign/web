import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './views/Login';
import Portfolio from './views/Portfolio';
import BackgroundCanvas from './components/BackgroundCanvas';
import ThemeToggle from './components/ThemeToggle';
import { Theme } from './types';

// Wrapper to handle navigation after login logic
const AppContent = () => {
    const [theme, setTheme] = useState<Theme>('light');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedAccess = sessionStorage.getItem('access_granted');
        if (storedAccess === 'true') {
            setIsAuthenticated(true);
        }

        const storedTheme = localStorage.getItem('theme') as Theme;
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme('dark'); 
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const handleLogin = () => {
        sessionStorage.setItem('access_granted', 'true');
        setIsAuthenticated(true);
        navigate('/portfolio');
    };

    return (
        <div className="min-h-screen relative overflow-hidden font-sans">
            {/* Background Color Layer - Placed behind canvas */}
            <div 
                className={`fixed inset-0 -z-20 transition-colors duration-500 ${theme === 'dark' ? 'bg-[#050505]' : 'bg-[#f4f4f4]'}`} 
            />
            
            {/* Animation Layer (-z-10 is handled in component) */}
            <BackgroundCanvas theme={theme} />
            
            <Routes>
                <Route 
                    path="/" 
                    element={
                        isAuthenticated ? <Navigate to="/portfolio" /> : (
                            <>
                                <div className="fixed top-8 right-8 z-50">
                                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                                </div>
                                <Login theme={theme} onLogin={handleLogin} />
                            </>
                        )
                    } 
                />
                <Route 
                    path="/portfolio" 
                    element={
                        isAuthenticated ? (
                            <Portfolio theme={theme} toggleTheme={toggleTheme} />
                        ) : (
                            <Navigate to="/" />
                        )
                    } 
                />
            </Routes>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <AppContent />
        </HashRouter>
    );
};

export default App;