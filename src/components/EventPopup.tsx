import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Award, Snowflake, Trophy, Compass } from 'lucide-react';

interface EventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export default function EventPopup({ isOpen, onClose, onRegisterClick }: EventPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg bg-bg-main border border-border-custom rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col transition-colors duration-300"
          >
            {/* Upper Banner Image */}
            <div className="relative h-48 w-full overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center animate-pulse-slow"
                style={{ backgroundImage: "url('/hero_snow_4x4_3.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/30 to-transparent" />
              
              {/* Event Badge */}
              <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-mono font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded shadow-lg">
                EDICIÓN HISTÓRICA
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-primary text-white border border-white/10 transition-colors duration-300 cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="space-y-2">
                <span className="font-display text-[10px] text-primary tracking-[0.3em] font-black uppercase flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5" /> 11 Y 12 DE SEPTIEMBRE, 2026
                </span>
                <h3 className="font-display text-2xl font-black text-text-main leading-tight uppercase">
                  1er Encuentro Provincial de Travesía 4x4 en Nieve
                </h3>
                <p className="font-sans text-[11px] text-text-muted tracking-wider uppercase font-bold">
                  Villa Pehuenia | Cordillera de Neuquén
                </p>
              </div>

              {/* Event Features List */}
              <div className="grid grid-cols-1 gap-3.5 text-xs text-text-secondary font-medium">
                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                    <Snowflake className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span>Curso de manejo invernal y cuidado ecológico.</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                    <Trophy className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span>Travesías técnicas extremas con sistema de puntajes.</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                    <Compass className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span>Almuerzo en montaña nevada, gran Cena Show y sorteos.</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-7 h-7 rounded bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span>Kit Oficial incluido: Remera y Gorra con logo oficial.</span>
                </div>
              </div>

              {/* Call to Action Button */}
              <button
                onClick={onRegisterClick}
                className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-display text-xs font-black tracking-[0.2em] transition-all duration-300 rounded shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center uppercase"
              >
                ¡INSCRIBIRSE AHORA!
              </button>
              
              <p className="text-[10px] text-center text-text-muted leading-relaxed max-w-xs mx-auto">
                * Cupos limitados para preservar el ecosistema de araucarias y senderos andinos.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
