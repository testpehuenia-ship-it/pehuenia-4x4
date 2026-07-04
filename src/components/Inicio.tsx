import { motion } from 'motion/react';
import { Settings, Users, Mountain, ArrowRight, ChevronDown, Map, Compass } from 'lucide-react';
import { Tab } from '../types';
import HeroSlider from './HeroSlider';

interface InicioProps {
  onNavigate: (tab: Tab, anchor?: string) => void;
  theme: 'light' | 'dark';
}

export default function Inicio({ onNavigate, theme }: InicioProps) {
  return (
    <div className="w-full">
      {/* Hero Section - Slider Dinámico */}
      <HeroSlider onNavigate={onNavigate} theme={theme} />

      {/* Features Section */}
      <section className="py-16 md:py-32 px-4 md:px-16 bg-bg-main transition-colors duration-300">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-text-main mb-4 uppercase tracking-tight"
          >
            EQUIPADOS PARA EL DESAFÍO
          </motion.h2>
          <div className="h-1 w-20 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Card 1: Vehículos de Élite */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 glass-card p-6 md:p-10 flex flex-col justify-end min-h-[350px] md:min-h-[420px] relative overflow-hidden group rounded"
          >
            <div 
              className="absolute inset-0 z-0 opacity-40 group-hover:scale-105 transition-transform duration-700 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDU67i_ryxiiYAFa7mJ-h5Pk2geIVKccq4poUMtbzo3YHSkqA4ADJkUtQjbnbbafGEoXxaxRbZ7jwN3KLVn8bTRl8l3h_lQMQKOJqlQw7VqXEk50vsHufuPRJD8L-6sTwS6zmpJIFG7FHynyzYGdnm0WEk7ZY3lpfGcc8pkzO2z05vCi3YHJGA5Qb5GwMOa7htoTd8f_JFmOleiqyhWDXkb3vfSDGS7gdxIpcEnjD-uRme4wesTuTeXFML2L_4Bj6_d4Qzgzxs7Uug')`
              }}
            />
            <div className="relative z-10">
              <Settings className="text-primary w-12 h-12 mb-6" />
              <h3 className="font-display text-2xl font-bold text-text-main mb-4 uppercase">Vehículos de Élite</h3>
              <p className="font-sans text-sm md:text-base text-text-secondary max-w-md leading-relaxed">
                Flota de camionetas modificadas con bloqueos de diferencial, malacates y neumáticos de nieve específicos para garantizar seguridad en cualquier terreno.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Guías Expertos */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 glass-card p-6 md:p-10 flex flex-col justify-between group rounded"
          >
            <div>
              <Users className="text-primary w-12 h-12 mb-6" />
              <h3 className="font-display text-2xl font-bold text-text-main mb-4 uppercase">Guías Expertos</h3>
              <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                Personal con certificación internacional en rescate y primeros auxilios en zonas agrestes.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('quienes-somos')}
              className="mt-8 md:mt-12 font-display text-xs font-bold text-primary hover:text-text-main border-t border-border-custom pt-6 flex items-center justify-between group-hover:translate-x-2 transition-transform duration-300 w-full text-left cursor-pointer"
            >
              CONOCÉ AL EQUIPO
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Card 3: Rutas Únicas */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 glass-card p-6 md:p-10 flex flex-col justify-between group rounded"
          >
            <div>
              <Mountain className="text-primary w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6" />
              <h3 className="font-display text-xl md:text-2xl font-bold text-text-main mb-3 md:mb-4 uppercase">Rutas Únicas</h3>
              <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                Acceso exclusivo a senderos de alta montaña vedados al público general durante el invierno.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('circuito')}
              className="mt-8 md:mt-12 font-display text-xs font-bold text-primary hover:text-text-main border-t border-border-custom pt-6 flex items-center justify-between group-hover:translate-x-2 transition-transform duration-300 w-full text-left cursor-pointer"
            >
              VER MAPA
              <Map className="w-5 h-5" />
            </button>
          </motion.div>

          {/* Card 4: Seguridad ante todo */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 glass-card p-6 md:p-10 flex flex-col justify-center relative overflow-hidden rounded"
          >
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="bg-primary text-white px-4 py-2 font-mono text-[10px] font-bold uppercase border border-primary/50 tracking-widest rounded shadow-[0_0_15px_rgba(255,95,31,0.35)] transition-all duration-300 hover:scale-105">Diff Lock Active</span>
              <span className="bg-primary text-white px-4 py-2 font-mono text-[10px] font-bold uppercase border border-primary/50 tracking-widest rounded shadow-[0_0_15px_rgba(255,95,31,0.35)] transition-all duration-300 hover:scale-105">Low Range 4x4</span>
              <span className="bg-primary text-white px-4 py-2 font-mono text-[10px] font-bold uppercase border border-primary/50 tracking-widest rounded shadow-[0_0_15px_rgba(255,95,31,0.35)] transition-all duration-300 hover:scale-105">Winch Ready</span>
              <span className="bg-primary text-white px-4 py-2 font-mono text-[10px] font-bold uppercase border border-primary/50 tracking-widest rounded shadow-[0_0_15px_rgba(255,95,31,0.35)] transition-all duration-300 hover:scale-105">Satellite Comms</span>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-text-main mb-3 uppercase">Seguridad ante todo</h3>
              <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed">
                Cada expedición cuenta con seguimiento satelital en tiempo real y protocolo de emergencia redundante para que disfrutes sin preocupaciones.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-32 px-4 md:px-16 bg-bg-secondary overflow-hidden relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative z-10 border-2 border-primary/30 p-4 rounded bg-bg-main/50">
              <div 
                className="w-full h-full bg-cover bg-center rounded"
                style={{ 
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5wrfSK3HdEdbkd3egV5ob22xJHmi0p4BHDN1c6jHHRdHTV01_1g5Cs-Fa5jv8gFrwx_z6HAUcVvolZNAJQH6ZKQEvdYQeccT31NNKnocdKdZWtHqQMT_bLF8guLZ0B2XlEGxZtMALV5PaZmPYekvK50A6RvwoRdpmWhezxwRF1NLnzlipMjORAMVHRul5XtBXplgCzmqESssELzqQJTuiQcuHthUVGLoCD5u0QzEzDMW0gdjvipMkxJFUrJW5ltyoOgO-TsbKOkk')`
                }}
              />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 -z-10 blur-3xl rounded-full" />
          </motion.div>

          <div className="space-y-8">
            <div className="font-display text-xs font-bold text-primary tracking-widest uppercase">Nuestra Historia</div>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-text-main leading-tight">
              QUIÉNES SOMOS: PASIÓN POR LO EXTREMO
            </h2>
            <p className="font-sans text-lg text-text-secondary leading-relaxed">
              Nacimos en el corazón de Villa Pehuenia con una sola misión: llevar la aventura off-road a su máxima expresión. No somos solo una empresa de turismo; somos entusiastas de la montaña y el motor.
            </p>
            <p className="font-sans text-text-muted leading-relaxed">
              Desde hace más de una década, trazamos caminos donde otros ven barreras de hielo. Nuestra experiencia técnica en modificación de vehículos y navegación en condiciones de visibilidad cero nos convierte en el referente indiscutido de la región.
            </p>
            
            <div className="flex flex-wrap gap-8 md:gap-12 pt-4">
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">12+</div>
                <div className="font-display text-[10px] text-text-muted tracking-widest uppercase font-semibold mt-1">Años de Exp.</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">500+</div>
                <div className="font-display text-[10px] text-text-muted tracking-widest uppercase font-semibold mt-1">Travesías</div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="font-display text-[10px] text-text-muted tracking-widest uppercase font-semibold mt-1">Seguridad</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-32 px-4 md:px-16 bg-bg-main text-center relative overflow-hidden transition-colors duration-300">
        <div className="relative z-10 max-w-3xl mx-auto space-y-6 md:space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-2xl sm:text-3xl md:text-6xl font-extrabold text-text-main uppercase tracking-tight"
          >
            ¿LISTO PARA EL DESAFÍO?
          </motion.h2>
          <p className="font-sans text-sm sm:text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Las plazas para la temporada de invierno son limitadas. Asegurá tu lugar en la próxima expedición a los picos nevados de la Patagonia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4 max-w-xs sm:max-w-none mx-auto">
            <button 
              onClick={() => onNavigate('quienes-somos', 'reserva-form')}
              className="bg-primary hover:bg-primary-hover text-white font-display text-xs md:text-sm font-bold tracking-widest px-6 py-4 md:px-12 md:py-6 transition-all duration-300 active:scale-95 shadow-2xl cursor-pointer rounded"
            >
              RESERVA AHORA
            </button>
            <button 
              onClick={() => onNavigate('quienes-somos', 'reserva-form')}
              className="border border-primary text-primary font-display text-xs md:text-sm font-bold tracking-widest px-6 py-4 md:px-12 md:py-6 hover:bg-primary/10 transition-all duration-300 active:scale-95 cursor-pointer rounded"
            >
              CONTACTAR ASESOR
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
