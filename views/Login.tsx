import React, { useState, KeyboardEvent } from 'react';
import { Theme } from '../types';
import { ArrowRight } from 'lucide-react';

interface LoginProps {
    theme: Theme;
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ theme, onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const checkPassword = () => {
        if (password === '2026') {
            onLogin();
        } else {
            setError(true);
            setPassword('');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') checkPassword();
        if (error) setError(false);
    };

    const isDark = theme === 'dark';

    return (
        <div className="fixed inset-0 z-40 grid place-items-center p-4">
            <div 
                className={`
                    w-[240px] h-[240px]
                    flex flex-col justify-center items-center p-6 relative
                    border backdrop-blur-md shadow-2xl transition-all duration-500
                    ${isDark 
                        ? 'bg-white/5 border-white/10 text-white shadow-black/20' 
                        : 'bg-white/40 border-black/5 text-black shadow-black/5'
                    }
                `}
            >
                <div className="flex flex-col gap-6 w-full">
                    <h1 className="text-[10px] font-bold tracking-[0.25em] uppercase whitespace-nowrap text-left opacity-90">
                        Blanchardesign
                    </h1>

                    <div className={`
                        flex items-center justify-between w-full border-b pb-1.5
                        ${isDark ? 'border-white/70' : 'border-black/70'}
                    `}>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="PASSWORD"
                            className={`
                                bg-transparent border-none outline-none w-full text-[10px] tracking-[0.15em] uppercase
                                placeholder:text-[10px] placeholder:tracking-[0.15em] placeholder:opacity-50
                                ${isDark ? 'text-white placeholder-white' : 'text-black placeholder-black'}
                            `}
                        />
                        <button 
                            onClick={checkPassword}
                            className={`
                                bg-transparent border-none cursor-pointer transition-transform hover:translate-x-1 flex-shrink-0
                                ${isDark ? 'text-white' : 'text-black'}
                            `}
                        >
                            <ArrowRight size={12} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                <p className={`
                    text-[8px] font-mono text-red-500 tracking-widest transition-opacity duration-300 absolute bottom-6 w-full text-center
                    ${error ? 'opacity-100' : 'opacity-0'}
                `}>
                    ACCESS DENIED
                </p>
            </div>
        </div>
    );
};

export default Login;