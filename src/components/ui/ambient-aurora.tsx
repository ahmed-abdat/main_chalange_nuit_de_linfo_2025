import React, { useRef, useEffect } from 'react';

const AuroraCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvasEl = canvasRef.current;
        if (!canvasEl) return;
        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;

        // Store non-null reference for use in class
        const canvas = canvasEl;
        const context = ctx;

        let time = 0;
        let animationFrameId: number;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const colors = [
            { r: 45, g: 212, b: 191 }, // Teal
            { r: 168, g: 85, b: 247 }, // Purple
            { r: 59, g: 130, b: 246 }, // Blue
            { r: 236, g: 72, b: 153 }  // Pink
        ];

        class Orb {
            x: number;
            y: number;
            radius: number;
            color: { r: number; g: number; b: number };
            vx: number;
            vy: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 400 + 100;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
            }

            draw() {
                const gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
                gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`);
                gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

                context.fillStyle = gradient;
                context.beginPath();
                context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                context.fill();
            }

            update() {
                this.x += this.vx + Math.sin(time * 0.001) * 0.5;
                this.y += this.vy + Math.cos(time * 0.001) * 0.5;

                if (this.x < -this.radius || this.x > canvas.width + this.radius || this.y < -this.radius || this.y > canvas.height + this.radius) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
            }
        }

        const orbs: Orb[] = [];
        for (let i = 0; i < 10; i++) {
            orbs.push(new Orb());
        }

        function animate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            time++;

            orbs.forEach(orb => {
                orb.update();
                orb.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        }
        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef}></canvas>;
};

export default AuroraCanvas;
