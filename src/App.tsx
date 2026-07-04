import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Calendar, Phone, Mail, MapPin, Sparkles, Snowflake, Compass, Sun, Moon } from 'lucide-react';
import { Tab, Reservation } from './types';
import Inicio from './components/Inicio';
import Circuito from './components/Circuito';
import Galeria from './components/Galeria';
import QuienesSomos from './components/QuienesSomos';
import ReservasManager from './components/ReservasManager';
import ScrollSplashEffect from './components/ScrollSplashEffect';
import EventPopup from './components/EventPopup';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('inicio');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isReservasOpen, setIsReservasOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Trigger event pop-up once per session after 2 seconds
  useEffect(() => {
    const shown = sessionStorage.getItem('pehuenia_event_popup_shown');
    if (!shown) {
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
        sessionStorage.setItem('pehuenia_event_popup_shown', 'true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleRegisterFromPopup = () => {
    setIsPopupOpen(false);
    handleNavigate('quienes-somos', 'reserva-form');
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('pehuenia_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Update HTML class list when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('pehuenia_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Load reservations from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pehuenia_4x4_reservations');
    if (saved) {
      try {
        setReservations(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing reservations from localStorage', e);
      }
    }
  }, []);

  // Save reservations to localStorage whenever it changes
  const saveReservations = (updated: Reservation[]) => {
    setReservations(updated);
    localStorage.setItem('pehuenia_4x4_reservations', JSON.stringify(updated));
  };

  const handleAddReservation = (newRes: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => {
    const reservation: Reservation = {
      ...newRes,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      status: 'Pendiente de Confirmación',
      createdAt: new Date().toLocaleDateString()
    };
    const updated = [reservation, ...reservations];
    saveReservations(updated);
    setBookingSuccess(true);
    
    // Auto-open reservations drawer after a brief delay to show the user their new entry!
    setTimeout(() => {
      setIsReservasOpen(true);
    }, 1500);
  };

  const handleDeleteReservation = (id: string) => {
    const updated = reservations.filter(r => r.id !== id);
    saveReservations(updated);
  };

  const handleUpdateStatus = (id: string, status: Reservation['status']) => {
    const updated = reservations.map(r => r.id === id ? { ...r, status } : r);
    saveReservations(updated);
  };

  const handleNavigate = (tab: Tab, anchor?: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (anchor) {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-bg-main text-text-secondary font-sans antialiased transition-colors duration-300">
      {/* Scroll Splash Wheel Particles (Snow & Mud) */}
      <ScrollSplashEffect theme={theme} />

      {/* High-impact Registration Pop-up */}
      <EventPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
        onRegisterClick={handleRegisterFromPopup} 
      />

      {/* Dynamic Snowflake Background Accent */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-5 dark:opacity-5 light:opacity-[0.03] z-0">
        <div className="absolute top-20 left-10 w-96 h-96 border border-current rounded-full animate-pulse" />
        <div className="absolute bottom-40 right-10 w-[500px] h-[500px] border border-current rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full glass-card border-b border-border-custom backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavigate('inicio')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded transition-transform duration-300 group-hover:rotate-12">
              <Snowflake className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-display text-lg font-black text-text-main tracking-widest uppercase">PEHUENIA</span>
              <span className="font-display text-lg font-light text-primary tracking-widest uppercase ml-1">4X4</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {(['inicio', 'circuito', 'galeria', 'quienes-somos'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => handleNavigate(tab)}
                className={`font-display text-xs font-bold tracking-widest relative py-2 cursor-pointer transition-colors duration-300 ${
                  activeTab === tab ? 'text-primary' : 'text-text-secondary/70 hover:text-text-main'
                }`}
              >
                {tab === 'inicio' && 'INICIO'}
                {tab === 'circuito' && 'CIRCUITO'}
                {tab === 'galeria' && 'GALERÍA'}
                {tab === 'quienes-somos' && 'QUIÉNES SOMOS & RESERVAS'}
                
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Call to Actions & Mobile Trigger */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-3 bg-glass-bg border border-border-custom hover:border-primary/50 text-text-main hover:text-primary transition-all duration-300 rounded cursor-pointer"
              title={theme === 'dark' ? 'Modo Día' : 'Modo Noche'}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
            </button>

            {/* My Reservations Floating Trigger */}
            <button
              onClick={() => setIsReservasOpen(true)}
              className="relative p-3 bg-glass-bg border border-border-custom hover:border-primary/50 text-text-main hover:text-primary transition-all duration-300 rounded cursor-pointer"
              title="Mis Reservas"
            >
              <Calendar className="w-5 h-5" />
              {reservations.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                  {reservations.length}
                </span>
              )}
            </button>

            {/* Quick Booking CTA */}
            <button
              onClick={() => handleNavigate('quienes-somos', 'reserva-form')}
              className="hidden lg:block bg-primary hover:bg-primary-hover text-white px-6 py-3 font-display text-[10px] font-bold tracking-widest transition-all duration-300 rounded cursor-pointer"
            >
              RESERVA ONLINE
            </button>

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 text-text-main/70 hover:text-text-main transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden w-full glass-card border-b border-border-custom overflow-hidden absolute top-20 left-0 right-0 z-30"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {(['inicio', 'circuito', 'galeria', 'quienes-somos'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleNavigate(tab)}
                  className={`text-left font-display text-sm font-bold tracking-widest py-2 border-b border-border-custom cursor-pointer ${
                    activeTab === tab ? 'text-primary' : 'text-text-secondary/70'
                  }`}
                >
                  {tab === 'inicio' && 'INICIO'}
                  {tab === 'circuito' && 'CIRCUITO'}
                  {tab === 'galeria' && 'GALERÍA'}
                  {tab === 'quienes-somos' && 'QUIÉNES SOMOS & RESERVAS'}
                </button>
              ))}
              <button
                onClick={() => handleNavigate('quienes-somos', 'reserva-form')}
                className="w-full bg-primary hover:bg-primary-hover text-white py-4 font-display text-xs font-bold tracking-widest text-center transition-all cursor-pointer rounded"
              >
                SOLICITAR RESERVA AHORA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            {activeTab === 'inicio' && <Inicio onNavigate={handleNavigate} theme={theme} />}
            {activeTab === 'circuito' && <Circuito onNavigate={handleNavigate} />}
            {activeTab === 'galeria' && <Galeria />}
            {activeTab === 'quienes-somos' && (
              <QuienesSomos 
                onAddReservation={handleAddReservation} 
                bookingSuccess={bookingSuccess}
                setBookingSuccess={setBookingSuccess}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-bg-footer border-t border-border-custom py-16 px-6 md:px-16 relative z-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded">
                <Snowflake className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display text-lg font-black text-text-main tracking-widest uppercase">PEHUENIA</span>
                <span className="font-display text-lg font-light text-primary tracking-widest uppercase ml-1">4X4</span>
              </div>
            </div>
            <p className="font-sans text-sm text-text-muted max-w-sm leading-relaxed">
              Expediciones extremas y turismo aventura en Villa Pehuenia, Neuquén, Patagonia Argentina. Equipamiento de élite y guías profesionales para garantizar travesías inolvidables.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display text-xs font-bold text-text-main uppercase tracking-wider">Explorar</h4>
            <div className="flex flex-col gap-3 font-display text-[11px] font-bold tracking-wider">
              <button onClick={() => handleNavigate('inicio')} className="text-left text-text-muted hover:text-primary transition-colors cursor-pointer">Inicio</button>
              <button onClick={() => handleNavigate('circuito')} className="text-left text-text-muted hover:text-primary transition-colors cursor-pointer">Circuito de los Volcanes</button>
              <button onClick={() => handleNavigate('galeria')} className="text-left text-text-muted hover:text-primary transition-colors cursor-pointer">Galería Fotográfica</button>
              <button onClick={() => handleNavigate('quienes-somos')} className="text-left text-text-muted hover:text-primary transition-colors cursor-pointer">Quiénes Somos</button>
              <button onClick={() => handleNavigate('quienes-somos', 'reserva-form')} className="text-left text-text-muted hover:text-primary transition-colors cursor-pointer">Solicitar Reserva</button>
            </div>
          </div>

          {/* Col 3: Operations & Legal */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-display text-xs font-bold text-text-main uppercase tracking-wider">Contacto Oficial</h4>
            <div className="space-y-3 font-sans text-xs text-text-muted">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="font-mono text-text-main">+54 9 2942 55-4X4</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="font-mono text-text-main">radiospehuenia@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Villa Pehuenia, Neuquén, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border-custom flex flex-col sm:flex-row justify-between items-center gap-4 text-center">
          <p className="text-[10px] text-text-muted font-mono">
            &copy; {new Date().getFullYear()} PEHUENIA 4X4. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-[10px] font-display font-semibold tracking-wider text-text-muted">
            <span className="hover:text-primary transition-colors cursor-pointer">TÉRMINOS DE SERVICIO</span>
            <span className="hover:text-primary transition-colors cursor-pointer">POLÍTICA DE PRIVACIDAD</span>
          </div>
        </div>
      </footer>

      {/* Persistent Reservations Sidebar/Manager */}
      <ReservasManager 
        isOpen={isReservasOpen}
        onClose={() => setIsReservasOpen(false)}
        reservations={reservations}
        onDeleteReservation={handleDeleteReservation}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
