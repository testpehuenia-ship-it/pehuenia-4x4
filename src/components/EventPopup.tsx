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
            className="relative w-full max-w-md bg-gradient-to-br from-[#1c6495] via-[#10476a] to-[#0a2f47] border-2 border-[#dfb73c]/50 rounded-lg shadow-2xl overflow-hidden z-10 flex flex-col transition-all duration-300"
          >
            {/* Upper Banner Image */}
            <div className="relative h-32 w-full overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center animate-pulse-slow"
                style={{ backgroundImage: "url('/hero_snow_4x4_3.png')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10476a] via-[#10476a]/30 to-transparent" />
              
              {/* Event Badge */}
              <div className="absolute top-3 left-3 bg-[#dfb73c] text-black text-[9px] font-mono font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded shadow-lg">
                EDICIÓN HISTÓRICA
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-[#dfb73c] text-white hover:text-black border border-white/10 transition-colors duration-300 cursor-pointer"
                aria-label="Cerrar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-5 md:p-6 space-y-4 text-white">
              {/* Title & Logo Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="font-display text-[9px] text-[#dfb73c] tracking-[0.2em] font-black uppercase flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#dfb73c]" /> 11 Y 12 DE SEPTIEMBRE, 2026
                  </span>
                  <h3 className="font-display text-xl font-black text-white leading-tight uppercase">
                    1er Encuentro Provincial
                  </h3>
                  <p className="font-sans text-[10px] text-white/70 tracking-wider uppercase font-bold">
                    Villa Pehuenia | Neuquén
                  </p>
                </div>
                <img src="/logoTraza4x4.png" alt="TRAZA 4x4" className="h-14 w-auto object-contain shrink-0" />
              </div>

              {/* Event Features List */}
              <div className="grid grid-cols-1 gap-2.5 text-xs text-white/90 font-medium">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#dfb73c]/10 border border-[#dfb73c]/30 flex items-center justify-center shrink-0">
                    <Snowflake className="w-3 h-3 text-[#dfb73c]" />
                  </div>
                  <span>Curso de manejo invernal y cuidado ecológico.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#dfb73c]/10 border border-[#dfb73c]/30 flex items-center justify-center shrink-0">
                    <Trophy className="w-3 h-3 text-[#dfb73c]" />
                  </div>
                  <span>Travesías técnicas extremas con sistema de puntajes.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#dfb73c]/10 border border-[#dfb73c]/30 flex items-center justify-center shrink-0">
                    <Compass className="w-3 h-3 text-[#dfb73c]" />
                  </div>
                  <span>Almuerzo en montaña, Cena Show y sorteos.</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-[#dfb73c]/10 border border-[#dfb73c]/30 flex items-center justify-center shrink-0">
                    <Award className="w-3 h-3 text-[#dfb73c]" />
                  </div>
                  <span>Kit Oficial incluido: Remera y Gorra oficial.</span>
                </div>
              </div>

              {/* Call to Action Button */}
              <button
                onClick={onRegisterClick}
                className="w-full py-3 bg-[#dfb73c] hover:bg-[#dfb73c]/90 text-black font-display text-xs font-black tracking-[0.2em] transition-all duration-300 rounded shadow-lg shadow-[#dfb73c]/10 hover:shadow-[#dfb73c]/20 hover:scale-[1.01] active:scale-[0.99] cursor-pointer text-center uppercase"
              >
                ¡INSCRIBIRSE AHORA!
              </button>
              
              <p className="text-[9px] text-center text-white/50 leading-relaxed max-w-xs mx-auto">
                * Cupos limitados para preservar el ecosistema de araucarias.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
