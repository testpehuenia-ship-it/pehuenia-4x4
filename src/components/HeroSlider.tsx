import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Tab } from '../types';

interface Slide {
  id: number;
  url: string;
  subtitle: string;
  title: string;
  description: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    url: '/hero_snow_4x4_1.png',
    subtitle: 'EXPEDICIONES DE INVIERNO',
    title: 'ADRENALINA EN LA NIEVE',
    description: 'Descubrí la Patagonia salvaje bajo un manto blanco. Travesías guiadas por expertos en Villa Pehuenia con vehículos de alta performance preparados para el clima más extremo.'
  },
  {
    id: 2,
    url: '/hero_snow_4x4_2.png',
    subtitle: 'DESAFÍOS TÉCNICOS',
    title: 'PENDIENTES EXTREMAS',
    description: 'Sentí el poder de la tracción total superando acumulaciones de nieve virgen y pendientes congeladas con la asistencia de nuestros guías certificados.'
  },
  {
    id: 3,
    url: '/hero_snow_4x4_3.png',
    subtitle: 'NAVEGACIÓN EN ALTURA',
    title: 'FILOS DE LA CORDILLERA',
    description: 'Navegá en convoy a través de filos montañosos nevados, contemplando vistas panorámicas únicas de los volcanes Lanín y Batea Mahuida.'
  },
  {
    id: 4,
    url: '/hero_snow_4x4_4.png',
    subtitle: 'BOSQUE DE ARAUCARIAS',
    title: 'RUTAS DE HIELO VIRGEN',
    description: 'Trazá senderos en bosques centenarios vedados al público general durante el invierno. Un escenario de fantasía invernal a tu alcance.'
  },
  {
    id: 5,
    url: '/hero_snow_4x4_5.png',
    subtitle: 'AVENTURA SIN LÍMITES',
    title: 'EXPEDICIÓN NOCTURNA',
    description: 'Desafiá la oscuridad total de la cordillera patagónica con potentes barras LED de alta intensidad. La montaña estrellada como nunca antes la viste.'
  }
];

interface HeroSliderProps {
  onNavigate: (tab: Tab, anchor?: string) => void;
  theme: 'light' | 'dark';
}

export default function HeroSlider({ onNavigate, theme }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const slideDuration = 6000; // 6 segundos por slide

  const resetAutoplay = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    setProgress(0);

    // Iniciar intervalo para barra de progreso
    const startTime = Date.now();
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / slideDuration) * 100, 100);
      setProgress(pct);
    }, 50);

    // Iniciar temporizador para cambiar slide
    timerRef.current = setTimeout(() => {
      handleNext();
    }, slideDuration);
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative h-[100dvh] min-h-[580px] w-full flex items-center justify-start overflow-hidden bg-black select-none">
      {/* Slider de Imágenes con Efecto Ken Burns */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, zIndex: 10 }}
            className="absolute inset-0"
          >
            {/* Panel Izquierdo */}
            <motion.div
              initial={{ x: '0%', skewX: 0, scale: 1 }}
              animate={{ scale: 1.08 }}
              exit={{ x: '-100%', skewX: -10 }}
              transition={{ 
                scale: { duration: slideDuration / 1000, ease: 'linear' },
                x: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                skewX: { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${SLIDES[currentIndex].url}')`,
                clipPath: 'polygon(0% 0%, 50.1% 0%, 50.1% 100%, 0% 100%)'
              }}
            />
            {/* Panel Derecho */}
            <motion.div
              initial={{ x: '0%', skewX: 0, scale: 1 }}
              animate={{ scale: 1.08 }}
              exit={{ x: '100%', skewX: 10 }}
              transition={{ 
                scale: { duration: slideDuration / 1000, ease: 'linear' },
                x: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
                skewX: { duration: 0.45, ease: [0.76, 0, 0.24, 1] }
              }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('${SLIDES[currentIndex].url}')`,
                clipPath: 'polygon(49.9% 0%, 100% 0%, 100% 100%, 49.9% 100%)'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Degradados de Superposición de Alto Contraste */}
        {theme === 'dark' ? (
          <>
            <div className="absolute inset-0 hero-gradient z-20 pointer-events-none" />
            <div className="absolute inset-0 bg-black/40 z-20 pointer-events-none" />
          </>
        ) : (
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg-main to-transparent z-20 pointer-events-none" />
        )}
      </div>

      {/* Contenido del Slide */}
      <div className="relative z-30 px-4 md:px-16 max-w-5xl w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <span className="font-display text-[10px] md:text-sm text-primary mb-3 md:mb-4 tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold block">
              {SLIDES[currentIndex].subtitle}
            </span>
            
            <h1 className={`font-display text-2xl sm:text-4xl md:text-7xl font-extrabold mb-4 md:mb-8 max-w-4xl leading-tight tracking-tight uppercase transition-colors duration-300 ${
              theme === 'dark' ? 'text-white' : 'text-text-main'
            }`}>
              {SLIDES[currentIndex].title}
            </h1>
            
            <p className={`font-sans text-xs sm:text-base md:text-xl mb-6 md:mb-12 max-w-2xl leading-relaxed transition-colors duration-300 ${
              theme === 'dark' ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'text-text-secondary font-medium'
            }`}>
              {SLIDES[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
        
        {/* Botones de Acción */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-xs sm:max-w-none">
          <button 
            onClick={() => onNavigate('quienes-somos', 'reserva-form')}
            className="bg-primary hover:bg-primary-hover text-white font-display text-xs md:text-sm font-bold tracking-widest px-6 py-4 md:px-10 md:py-5 transition-all duration-300 active:scale-95 shadow-xl cursor-pointer rounded"
          >
            RESERVA TU TRAVESÍA
          </button>
          <button 
            onClick={() => onNavigate('circuito')}
            className={`font-display text-xs md:text-sm font-bold tracking-widest px-6 py-4 md:px-10 md:py-5 transition-all duration-300 active:scale-95 backdrop-blur-sm cursor-pointer rounded text-center border ${
              theme === 'dark' ? 'border-white/40 text-white hover:bg-white/10' : 'border-primary text-primary hover:bg-primary/10'
            }`}
          >
            EXPLORAR CIRCUITOS
          </button>
        </div>
      </div>

      {/* Controles Manuales: Flechas Laterales */}
      <button
        onClick={handlePrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded hover:bg-primary hover:text-white transition-all duration-300 hidden md:block cursor-pointer border ${
          theme === 'dark' ? 'bg-black/30 text-white border-white/10' : 'bg-white/70 text-text-main border-border-custom shadow'
        }`}
        title="Anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded hover:bg-primary hover:text-white transition-all duration-300 hidden md:block cursor-pointer border ${
          theme === 'dark' ? 'bg-black/30 text-white border-white/10' : 'bg-white/70 text-text-main border-border-custom shadow'
        }`}
        title="Siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicadores de Diapositiva (Puntos) y Barra de Progreso */}
      <div className="absolute bottom-8 left-4 right-4 md:left-16 md:right-16 z-30 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => handleDotClick(index)}
              className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 cursor-pointer ${
                theme === 'dark' ? 'bg-white/20' : 'bg-black/20'
              }`}
              style={{ width: currentIndex === index ? '60px' : '10px' }}
            >
              {currentIndex === index && (
                <div 
                  className="h-full bg-primary"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Indicador de Scroll hacia abajo */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70 pointer-events-none hidden md:flex z-30">
        <span className={`font-display text-[10px] tracking-widest font-medium ${theme === 'dark' ? 'text-white' : 'text-text-main'}`}>SCROLL</span>
        <ChevronDown className="text-primary w-5 h-5" />
      </div>
    </section>
  );
}
