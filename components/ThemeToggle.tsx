import React from 'react';
import { Theme } from '../types';

interface ThemeToggleProps {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
    return (
        <button 
            onClick={toggleTheme}
            className={`
                uppercase text-xs font-semibold tracking-widest transition-opacity duration-300
                hover:opacity-100 opacity-60
                ${theme === 'dark' ? 'text-white' : 'text-black'}
            `}
        >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
    );
};

export default ThemeToggle;