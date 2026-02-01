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
        <div className="flex w-full h-screen justify-center items-center p-4">
            <div 
                className={`
                    w-52 sm:w-56 aspect-square
                    flex flex-col justify-center items-start p-5
                    border backdrop-blur-md shadow-2xl transition-all duration-500
                    ${isDark 
                        ? 'bg-white/5 border-white/10 text-white shadow-black/20' 
                        : 'bg-white/40 border-black/5 text-black shadow-black/5'
                    }
                `}
            >
                {/* Wrapper to align input width with title text width */}
                <div className="flex flex-col gap-3 w-fit">
                    <h1 className="text-[13px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">
                        Blanchardesign
                    </h1>

                    <div className={`
                        flex items-center justify-between w-full border-b-[0.5px] pb-1 pr-[0.2em]
                        ${isDark ? 'border-white' : 'border-black'}
                    `}>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="PASSWORD"
                            className={`
                                bg-transparent border-none outline-none w-full text-[11px] tracking-[0.1em] uppercase
                                placeholder:text-[11px] placeholder:tracking-[0.1em] placeholder:opacity-50
                                ${isDark ? 'text-white placeholder-white' : 'text-black placeholder-black'}
                            `}
                        />
                        <button 
                            onClick={checkPassword}
                            className={`
                                bg-transparent border-none cursor-pointer transition-transform hover:translate-x-0.5 flex-shrink-0
                                ${isDark ? 'text-white' : 'text-black'}
                            `}
                        >
                            <ArrowRight size={14} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>

                <p className={`
                    text-[9px] font-mono text-red-500 transition-opacity duration-300 absolute bottom-5 left-0 w-full text-center
                    ${error ? 'opacity-100' : 'opacity-0'}
                `}>
                    Access Denied.
                </p>
            </div>
        </div>
    );
};

export default Login;