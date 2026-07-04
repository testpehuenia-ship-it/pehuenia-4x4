import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trash2, X, Compass, CheckCircle2, User } from 'lucide-react';
import { Reservation } from '../types';

interface ReservasManagerProps {
  isOpen: boolean;
  onClose: () => void;
  reservations: Reservation[];
  onDeleteReservation: (id: string) => void;
  onUpdateStatus: (id: string, status: Reservation['status']) => void;
}

export default function ReservasManager({ isOpen, onClose, reservations, onDeleteReservation, onUpdateStatus }: ReservasManagerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-bg-main border-l border-border-custom p-6 md:p-8 flex flex-col justify-between z-10 transition-colors duration-300"
          >
            {/* Header */}
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-border-custom">
                <div className="flex items-center gap-2">
                  <Calendar className="text-primary w-5 h-5" />
                  <h3 className="font-display text-lg font-bold text-text-main uppercase tracking-wider">Mis Reservas</h3>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 text-text-secondary/50 hover:text-text-main hover:bg-glass-bg transition-all rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Reservations List */}
              <div className="space-y-4 max-h-[calc(100dvh-270px)] overflow-y-auto pr-1">
                {reservations.length === 0 ? (
                  <div className="text-center py-16 space-y-4">
                    <Compass className="w-12 h-12 text-text-muted/30 mx-auto animate-spin" style={{ animationDuration: '8s' }} />
                    <p className="font-sans text-sm text-text-muted">No tenés reservas solicitadas en este navegador.</p>
                  </div>
                ) : (
                  reservations.map((res) => (
                    <div key={res.id} className="glass-card p-5 rounded space-y-4 border-border-custom relative">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h4 className="font-display text-sm font-bold text-text-main uppercase">{res.name}</h4>
                          <p className="font-mono text-[10px] text-primary">{res.vehicle}</p>
                        </div>
                        <button 
                          onClick={() => onDeleteReservation(res.id)}
                          className="p-1.5 text-text-secondary/30 hover:text-red-500 hover:bg-red-500/10 transition-all rounded cursor-pointer"
                          title="Eliminar reserva"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-text-secondary">
                        <div>
                          <span className="block text-[9px] text-text-muted uppercase font-semibold">FECHA ESTIMADA</span>
                          <span className="font-mono text-text-main">{res.date}</span>
                        </div>
                        <div>
                          <span className="block text-[9px] text-text-muted uppercase font-semibold">INTEGRANTES</span>
                          <span className="font-mono text-text-main">{res.people}</span>
                        </div>
                      </div>

                      {/* Status and Action */}
                      <div className="pt-3 border-t border-border-custom flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            res.status === 'Confirmada' ? 'bg-green-500 animate-pulse' : 'bg-amber-500'
                          }`} />
                          <span className="font-display text-[9px] font-bold uppercase tracking-wider text-text-main">
                            {res.status}
                          </span>
                        </div>
                        
                        {/* Demo status toggle to simulate backend validation */}
                        {res.status === 'Pendiente de Confirmación' && (
                          <button
                            onClick={() => onUpdateStatus(res.id, 'Confirmada')}
                            className="text-[9px] font-display font-semibold text-primary hover:text-white border border-primary/40 px-2 py-1 hover:bg-primary transition-all rounded cursor-pointer"
                          >
                            SIMULAR APROBACIÓN
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-border-custom space-y-4 bg-bg-main transition-colors duration-300">
              <div className="p-4 bg-primary/5 border border-primary/15 rounded flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-text-secondary leading-relaxed font-sans">
                  El sistema guarda localmente tus solicitudes para seguimiento offline. Si necesitás una reserva urgente, recordá contactar a operaciones vía WhatsApp.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-display text-xs font-bold tracking-widest transition-all rounded cursor-pointer"
              >
                ENTENDIDO
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
