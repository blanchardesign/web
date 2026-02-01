export type Theme = 'light' | 'dark';

export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    size: 'normal' | 'wide' | 'tall' | 'big';
}