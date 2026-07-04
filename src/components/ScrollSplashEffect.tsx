import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  gravity: number;
  friction: number;
}

interface ScrollSplashEffectProps {
  theme: 'light' | 'dark';
}

export default function ScrollSplashEffect({ theme }: ScrollSplashEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastScrollTopRef = useRef(0);
  const lastScrollTimeRef = useRef(Date.now());
  const animationFrameIdRef = useRef<number | null>(null);

  // Colores de partículas basados en el tema
  const getParticleColors = () => {
    if (theme === 'dark') {
      return [
        'rgba(255, 255, 255, 0.95)', // Nieve pura
        'rgba(255, 255, 255, 0.8)',  // Copo de nieve
        'rgba(255, 95, 31, 0.9)',    // Naranja neón (barro radioactivo/vivos)
        'rgba(255, 122, 69, 0.8)',   // Naranja claro
      ];
    } else {
      return [
        'rgba(255, 255, 255, 0.95)', // Nieve pura
        'rgba(171, 54, 0, 0.85)',    // Barro naranja oscuro
        'rgba(139, 90, 43, 0.9)',    // Barro marrón arcilloso
        'rgba(161, 161, 170, 0.5)',  // Gotas de agua/hielo derretido
      ];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar dimensiones del Canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Guardar posición inicial del scroll
    lastScrollTopRef.current = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollTimeRef.current = Date.now();

    let lastFrameTime = performance.now();
    const fpsInterval = 1000 / 60; // ~16.67ms por frame (60 FPS)

    // Bucle de Animación Física
    const updateAndDrawParticles = (timestamp: number) => {
      // Agendar el siguiente frame si aún quedan partículas
      if (particlesRef.current.length > 0) {
        animationFrameIdRef.current = requestAnimationFrame(updateAndDrawParticles);
      } else {
        animationFrameIdRef.current = null;
      }

      // Limitar a 60 FPS
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < fpsInterval) return;

      lastFrameTime = timestamp - (elapsed % fpsInterval);

      const w = canvas.width;
      const h = canvas.height;
      
      // Limpiar lienzo
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Aplicar física
        p.vx *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        // Eliminar partículas fuera de rango o desvanecidas
        if (p.alpha <= 0 || p.x < 0 || p.x > w || p.y > h) {
          particles.splice(i, 1);
          continue;
        }

        // Dibujar partícula
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    // Crear partículas por rueda
    const spawnSplashParticles = (scrollVelocity: number, isScrollingDown: boolean) => {
      const w = canvas.width;
      const h = canvas.height;
      
      // La intensidad de la salpicadura escala con la velocidad de desplazamiento
      // Limitamos el máximo de partículas para no sobrecargar el renderizado
      const particleCount = Math.min(Math.floor(scrollVelocity * 15), 18);
      if (particleCount <= 0) return;

      const colors = getParticleColors();
      const particles = particlesRef.current;

      // Puntos de origen de neumáticos (12% y 88% de la base de la pantalla)
      const leftTireX = w * 0.12;
      const rightTireX = w * 0.88;
      const tireY = h;

      // Si la dirección es hacia abajo, las ruedas arrojan barro hacia arriba/atrás.
      // Si la dirección es hacia arriba, invertimos levemente el ángulo.
      const directionMultiplier = isScrollingDown ? 1 : 0.8;

      for (let k = 0; k < particleCount; k++) {
        const size = Math.random() * 4 + 2; // Partículas de 2px a 6px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const alpha = Math.random() * 0.3 + 0.7; // Opacidad inicial
        const decay = Math.random() * 0.02 + 0.015; // Velocidad de desvanecimiento
        const friction = 0.985;
        const gravity = Math.random() * 0.2 + 0.12; // Gravedad individual

        // Partículas del lado izquierdo (salpican arriba e izquierda)
        particles.push({
          x: leftTireX + (Math.random() * 30 - 15),
          y: tireY - 10,
          vx: -(Math.random() * 6 + 2) * scrollVelocity * 0.8,
          vy: -(Math.random() * 12 + 6) * scrollVelocity * directionMultiplier,
          size,
          color,
          alpha,
          decay,
          gravity,
          friction
        });

        // Partículas del lado derecho (salpican arriba y derecha)
        particles.push({
          x: rightTireX + (Math.random() * 30 - 15),
          y: tireY - 10,
          vx: (Math.random() * 6 + 2) * scrollVelocity * 0.8,
          vy: -(Math.random() * 12 + 6) * scrollVelocity * directionMultiplier,
          size,
          color,
          alpha,
          decay,
          gravity,
          friction
        });
      }

      // Iniciar el bucle de renderizado si no está corriendo
      if (!animationFrameIdRef.current) {
        lastFrameTime = performance.now();
        animationFrameIdRef.current = requestAnimationFrame(updateAndDrawParticles);
      }
    };

    // Escuchar el evento de desplazamiento (Scroll)
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const time = Date.now();
      const timeDiff = time - lastScrollTimeRef.current;

      if (timeDiff > 0) {
        const scrollDiff = scrollTop - lastScrollTopRef.current;
        const isScrollingDown = scrollDiff > 0;
        const absScrollDiff = Math.abs(scrollDiff);
        
        // Velocidad en pixeles por milisegundo
        const velocity = absScrollDiff / timeDiff;

        // Umbral de activación para evitar partículas por micro-desplazamientos
        if (velocity > 0.15) {
          spawnSplashParticles(velocity, isScrollingDown);
        }
      }

      lastScrollTopRef.current = scrollTop;
      lastScrollTimeRef.current = time;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}
