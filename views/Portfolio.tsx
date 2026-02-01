import React from 'react';
import { Theme, Project } from '../types';
import ThemeToggle from '../components/ThemeToggle';

interface PortfolioProps {
    theme: Theme;
    toggleTheme: () => void;
}

const projects: Project[] = [
    { id: 1, title: 'Project 01', category: 'Architecture', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2600&auto=format&fit=crop', size: 'normal' },
    { id: 2, title: 'Project 02', category: 'Motion', image: 'https://media.giphy.com/media/3o7WITY7sB1qF5T3j2/giphy.gif', size: 'wide' },
    { id: 3, title: 'Project 03', category: 'Verticality', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2600&auto=format&fit=crop', size: 'tall' },
    { id: 4, title: 'Project 04', category: 'Detail', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2600&auto=format&fit=crop', size: 'normal' },
    { id: 5, title: 'Project 05', category: 'Featured', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2600&auto=format&fit=crop', size: 'big' },
    { id: 6, title: 'Project 06', category: 'Simulation', image: 'https://media.giphy.com/media/l41YcGT5ShJa0nCM0/giphy.gif', size: 'normal' },
    { id: 7, title: 'Project 07', category: 'Landscape', image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2600&auto=format&fit=crop', size: 'wide' },
    { id: 8, title: 'Project 08', category: 'Structure', image: 'https://images.unsplash.com/photo-1488972685288-c3cc15799269?q=80&w=2600&auto=format&fit=crop', size: 'tall' },
    { id: 9, title: 'Project 09', category: 'Abstract', image: 'https://images.unsplash.com/photo-1518005052357-e9871951f3a2?q=80&w=2600&auto=format&fit=crop', size: 'normal' },
    { id: 10, title: 'Project 10', category: 'Interior', image: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=2600&auto=format&fit=crop', size: 'normal' },
    { id: 11, title: 'Project 11', category: 'Process', image: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif', size: 'wide' },
    { id: 12, title: 'Project 12', category: 'Form', image: 'https://images.unsplash.com/photo-1524230572899-a752b3835840?q=80&w=2600&auto=format&fit=crop', size: 'normal' },
];

const Portfolio: React.FC<PortfolioProps> = ({ theme, toggleTheme }) => {
    const isDark = theme === 'dark';

    const getGridClass = (size: string) => {
        switch (size) {
            case 'wide': return 'col-span-1 md:col-span-2';
            case 'tall': return 'row-span-1 md:row-span-2';
            case 'big': return 'col-span-1 md:col-span-2 row-span-1 md:row-span-2';
            default: return '';
        }
    };

    return (
        <div className={`min-h-screen w-full transition-colors duration-500 ${isDark ? 'text-white' : 'text-black'}`}>
            <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-8 z-50 pointer-events-none">
                <div className="text-sm font-medium tracking-[0.2em] uppercase pointer-events-auto">
                    Blanchardesign
                </div>
                <div className="pointer-events-auto">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
            </nav>

            <main className="pt-24 pb-12 px-4 md:px-12 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-dense auto-rows-[300px]">
                    {projects.map((project) => (
                        <a 
                            key={project.id} 
                            href="#" 
                            className={`
                                relative group overflow-hidden block cursor-pointer
                                ${getGridClass(project.size)}
                            `}
                        >
                            <div className="w-full h-full relative">
                                <img 
                                    src={project.image} 
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <h2 className="text-white text-xl font-light tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {project.title}
                                    </h2>
                                    <span className="text-white/70 text-xs uppercase tracking-[0.15em] mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        {project.category}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Portfolio;