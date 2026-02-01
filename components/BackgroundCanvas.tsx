import React, { useEffect, useRef } from 'react';
import { Theme } from '../types';

interface BackgroundCanvasProps {
    theme: Theme;
}

const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ theme }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(0);
    
    // Grid settings
    const gap = 45;
    const rows = 160;
    const cols = 160;
    const initialTime = 0;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let time = initialTime;
        
        let mouse = { x: width / 2, y: height / 2 };
        let targetMouse = { x: width / 2, y: height / 2 };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        
        const handleMouseMove = (e: MouseEvent) => {
            targetMouse.x = e.clientX;
            targetMouse.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        resize();

        // Helper: Project 3D point to 2D
        const project = (x: number, y: number, z: number) => {
            const angle = 0.5;
            const tiltX = (mouse.x / width - 0.5) * 0.05;
            const tiltY = (mouse.y / height - 0.5) * 0.05;

            const isoX = (x - y) * Math.cos(angle + tiltX);
            const isoY = (x + y) * Math.sin(angle + tiltY) - z;

            return {
                x: isoX + width / 2,
                y: isoY + height / 2
            };
        };

        const animate = () => {
            requestRef.current = requestAnimationFrame(animate);

            // Mouse Easing
            mouse.x += (targetMouse.x - mouse.x) * 0.05;
            mouse.y += (targetMouse.y - mouse.y) * 0.05;

            // Clear
            ctx.clearRect(0, 0, width, height);
            
            // Theme dependent styles
            const isDark = theme === 'dark';
            ctx.lineWidth = isDark ? 0.5 : 0.4;

            const offsetX = (cols * gap) / 2;
            const offsetY = (rows * gap) / 2;
            const buffer = 100;

            time += 0.01;

            let currentRow = new Array(cols);
            let prevRow = new Array(cols);

            for (let r = 0; r < rows; r++) {
                // Swap row buffers
                const temp = prevRow;
                prevRow = currentRow;
                currentRow = temp || new Array(cols);

                for (let c = 0; c < cols; c++) {
                    const x = (c * gap) - offsetX;
                    const y = (r * gap) - offsetY;

                    // Wave Geometry
                    const distFromCenter = Math.sqrt(x * x + y * y);
                    const normalizedDist = distFromCenter / 2500;
                    
                    let z = Math.sin(r * 0.1 + time) * Math.cos(c * 0.1 + time) * (normalizedDist * 60);

                    // Mouse Interaction
                    if (Math.abs(x - (mouse.x - width / 2)) < 1000) {
                         const p2d_x = (x - y) * 0.8 + width / 2;
                         const p2d_y = (x + y) * 0.5 + height / 2;
                         const dx = mouse.x - p2d_x;
                         const dy = mouse.y - p2d_y;
                         const mouseDist = Math.sqrt(dx * dx + dy * dy);

                         if (mouseDist < 500) {
                             z -= Math.cos(mouseDist * 0.006) * 100 * (1 - mouseDist / 500);
                         }
                         currentRow[c] = { x, y, z, mouseDist };
                    } else {
                        currentRow[c] = { x, y, z, mouseDist: 9999 };
                    }

                    // Drawing
                    const p1 = currentRow[c];
                    const v1 = project(p1.x, p1.y, p1.z);

                    // Culling
                    if (v1.x < -buffer || v1.x > width + buffer || v1.y < -buffer || v1.y > height + buffer) continue;

                    // Style
                    const baseOpacity = isDark ? 0.08 : 0.05;
                    const highlight = p1.mouseDist < 500 ? (1 - p1.mouseDist / 500) * 0.5 : 0;
                    const depth = (normalizedDist * 0.3);
                    let opacity = baseOpacity + highlight + depth;
                    if (opacity > 0.6) opacity = 0.6;

                    ctx.strokeStyle = isDark ? `rgba(255,255,255,${opacity})` : `rgba(0,0,0,${opacity})`;
                    ctx.beginPath();

                    if (c > 0) {
                        const pLeft = currentRow[c - 1];
                        const vLeft = project(pLeft.x, pLeft.y, pLeft.z);
                        ctx.moveTo(vLeft.x, vLeft.y);
                        ctx.lineTo(v1.x, v1.y);
                    }

                    if (r > 0) {
                        const pUp = prevRow[c];
                        const vUp = project(pUp.x, pUp.y, pUp.z);
                        ctx.moveTo(vUp.x, vUp.y);
                        ctx.lineTo(v1.x, v1.y);
                    }
                    ctx.stroke();
                }
            }
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [theme]); // Re-init when theme changes to ensure correct colors

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-auto"
        />
    );
};

export default BackgroundCanvas;