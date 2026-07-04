import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, CheckCircle, ShieldAlert, Award } from 'lucide-react';
import { Reservation } from '../types';

interface QuienesSomosProps {
  onAddReservation: (res: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => void;
  bookingSuccess: boolean;
  setBookingSuccess: (val: boolean) => void;
}

const GUIDES = [
  {
    name: 'Juan Hernandez',
    role: 'Founder & Expedition Chief',
    tag: 'Liderazgo en Terreno Extremo',
    bio: '15 años de experiencia liderando expediciones invernales en los Andes. Certificado WFR (Wilderness First Responder).',
    avatar: '/guide_juan.png'
  },
  {
    name: 'Lucía Torres',
    role: 'Mountain Guide & Logistics',
    tag: 'Navegación e Instrumentación',
    bio: 'Especialista en cartografía digital y rescate técnico. Coordinadora general de nuestra base de operaciones.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'TEODORO AROCA PUEL',
    role: 'Local Ancestral Knowledge',
    tag: 'Lectura de Clima',
    bio: 'Nacido en la región de Villa Pehuenia. Su profundo entendimiento del microclima andino es nuestra mayor salvaguarda.',
    avatar: '/guide_teodoro.png'
  }
];

export default function QuienesSomos({ onAddReservation, bookingSuccess, setBookingSuccess }: QuienesSomosProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    people: '1-2',
    vehicle: 'Toyota Hilux / SW4',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'El nombre es requerido';
    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email ingresado no es válido';
    }
    if (!formData.date) errors.date = 'La fecha estimada es requerida';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    onAddReservation(formData);
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      date: '',
      people: '1-2',
      vehicle: 'Toyota Hilux / SW4',
      message: ''
    });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[500px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center brightness-75"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB5wrfSK3HdEdbkd3egV5ob22xJHmi0p4BHDN1c6jHHRdHTV01_1g5Cs-Fa5jv8gFrwx_z6HAUcVvolZNAJQH6ZKQEvdYQeccT31NNKnocdKdZWtHqQMT_bLF8guLZ0B2XlEGxZtMALV5PaZmPYekvK50A6RvwoRdpmWhezxwRF1NLnzlipMjORAMVHRul5XtBXplgCzmqESssELzqQJTuiQcuHthUVGLoCD5u0QzEzDMW0gdjvipMkxJFUrJW5ltyoOgO-TsbKOkk')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/40 to-transparent" />
        </div>
        <div className="relative z-10 px-4 md:px-16 max-w-4xl">
          <span className="font-display text-xs font-bold text-primary tracking-[0.2em] mb-3 block uppercase">OPERACIONES DE MONTAÑA</span>
          <h1 className="font-display text-2xl sm:text-3xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 uppercase leading-tight">
            Liderazgo en<br />
            <span className="text-primary">Terreno Extremo</span>
          </h1>
        </div>
      </section>

      {/* About Description and Grid */}
      <section className="py-12 md:py-24 px-4 md:px-16 bg-bg-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-8">
            <h2 className="font-display text-3xl font-bold text-text-main uppercase tracking-tight">
              Expertos en el Blanco
            </h2>
            <div className="h-1 w-16 bg-primary" />
            <p className="font-sans text-lg text-text-secondary leading-relaxed">
              Conducción en nieve profunda, rescate en avalanchas e instrumentación satelital. Cada una de nuestras expediciones se planifica bajo exigentes estándares militares y náuticos de navegación terrestre.
            </p>
            <p className="font-sans text-text-muted leading-relaxed">
              Creemos que la montaña invernal merece el máximo respeto. Por eso invertimos constantemente en el re-equipamiento de nuestras unidades de apoyo y en capacitaciones de supervivencia andina para todos nuestros guías líderes.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-glass-bg border border-border-custom text-xs font-mono font-bold uppercase text-text-main rounded">
                <Award className="w-4 h-4 text-primary" />
                Certificación WFR
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-glass-bg border border-border-custom text-xs font-mono font-bold uppercase text-text-main rounded">
                <ShieldAlert className="w-4 h-4 text-primary" />
                Navegación Satelital
              </span>
            </div>
          </div>

          {/* Right Custom Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5wrfSK3HdEdbkd3egV5ob22xJHmi0p4BHDN1c6jHHRdHTV01_1g5Cs-Fa5jv8gFrwx_z6HAUcVvolZNAJQH6ZKQEvdYQeccT31NNKnocdKdZWtHqQMT_bLF8guLZ0B2XlEGxZtMALV5PaZmPYekvK50A6RvwoRdpmWhezxwRF1NLnzlipMjORAMVHRul5XtBXplgCzmqESssELzqQJTuiQcuHthUVGLoCD5u0QzEzDMW0gdjvipMkxJFUrJW5ltyoOgO-TsbKOkk" 
                alt="Portrait Guide" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <div className="aspect-square rounded overflow-hidden mt-8">
              <img 
                src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=400" 
                alt="Truck in deep snow" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section className="py-12 md:py-24 px-4 md:px-16 bg-bg-secondary border-t border-b border-border-custom transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-text-main uppercase tracking-tight">Nuestros Líderes</h2>
            <div className="h-1 w-16 bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {GUIDES.map((guide) => (
              <div key={guide.name} className="glass-card p-8 rounded-lg space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                    <img src={guide.avatar} alt={guide.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-2">
                    <span className="font-display text-[10px] text-primary tracking-widest uppercase font-bold">{guide.tag}</span>
                    <h3 className="font-display text-2xl font-bold text-text-main uppercase">{guide.name}</h3>
                    <p className="font-mono text-xs text-text-muted uppercase">{guide.role}</p>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed font-sans">{guide.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact and Booking Section */}
      <section className="py-12 md:py-24 px-4 md:px-16 bg-bg-main transition-colors duration-300" id="reserva-form">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* Contact Info Card */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="font-display text-xs font-bold text-primary tracking-widest uppercase">RESERVAS DIRECTAS</span>
              <h2 className="font-display text-4xl font-extrabold text-text-main uppercase">Sede Central</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Contactanos por cualquiera de nuestros canales oficiales o completá el formulario adjunto para iniciar la cotización de tu itinerario a medida.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-glass-bg border border-border-custom rounded text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-text-muted tracking-wider uppercase">Llamadas & WhatsApp</h4>
                  <p className="text-text-main font-mono font-bold mt-1 hover:text-primary transition-colors">+54 9 2942 55-4X4</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-glass-bg border border-border-custom rounded text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-text-muted tracking-wider uppercase">Correo de Operaciones</h4>
                  <p className="text-text-main font-mono font-bold mt-1 hover:text-primary transition-colors">radiospehuenia@gmail.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-glass-bg border border-border-custom rounded text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-text-muted tracking-wider uppercase">Base de Operaciones</h4>
                  <p className="text-text-main font-sans mt-1">Ruta Provincial 13, Km 5, Villa Pehuenia, Neuquén</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form Card */}
          <div className="lg:col-span-7 glass-card p-6 md:p-12 rounded-lg relative">
            <h3 className="font-display text-2xl font-bold text-text-main mb-8 uppercase tracking-tight">Formulario de Reserva</h3>
            
            {bookingSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary/10 border border-primary p-8 rounded text-center space-y-4"
              >
                <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                <h4 className="font-display text-xl font-bold text-white uppercase">Solicitud Recibida</h4>
                <p className="text-sm text-[#ccdbf4]/80 max-w-md mx-auto leading-relaxed">
                  Tu solicitud ha sido registrada con éxito en nuestro sistema de travesías. En breve, un guía del equipo de operaciones se comunicará para validar el equipamiento de tu unidad.
                </p>
                <button
                  onClick={() => setBookingSuccess(false)}
                  className="mt-4 font-display text-xs font-bold text-primary hover:text-white border-t border-white/10 pt-4 w-full cursor-pointer"
                >
                  ENVIAR OTRA SOLICITUD
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="font-display text-[10px] text-text-muted tracking-wider uppercase font-semibold">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ej. Juan Pérez"
                      className="w-full bg-bg-main border border-border-custom px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary rounded"
                    />
                    {formErrors.name && <p className="text-red-500 text-xs">{formErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="font-display text-[10px] text-text-muted tracking-wider uppercase font-semibold">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Ej. juan@correo.com"
                      className="w-full bg-bg-main border border-border-custom px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary rounded"
                    />
                    {formErrors.email && <p className="text-red-500 text-xs">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="font-display text-[10px] text-text-muted tracking-wider uppercase font-semibold">Fecha Estimada</label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-bg-main border border-border-custom px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary rounded"
                    />
                    {formErrors.date && <p className="text-red-500 text-xs">{formErrors.date}</p>}
                  </div>

                  {/* Number of People */}
                  <div className="space-y-2">
                    <label className="font-display text-[10px] text-text-muted tracking-wider uppercase font-semibold">N° de Integrantes</label>
                    <select
                      value={formData.people}
                      onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                      className="w-full bg-bg-main border border-border-custom px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary rounded"
                    >
                      <option value="1-2" className="bg-bg-main text-text-main">1 - 2 Personas</option>
                      <option value="3-4" className="bg-bg-main text-text-main">3 - 4 Personas</option>
                      <option value="5+" className="bg-bg-main text-text-main">5+ Personas</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle Type */}
                <div className="space-y-2">
                  <label className="font-display text-[10px] text-text-muted tracking-wider uppercase font-semibold">Tipo de Vehículo</label>
                  <select
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full bg-bg-main border border-border-custom px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary rounded"
                  >
                    <option value="Toyota Hilux / SW4" className="bg-bg-main text-text-main">Toyota Hilux / SW4</option>
                    <option value="Ford Ranger / Raptor" className="bg-bg-main text-text-main">Ford Ranger / Raptor</option>
                    <option value="Jeep Wrangler / Gladiator" className="bg-bg-main text-text-main">Jeep Wrangler / Gladiator</option>
                    <option value="Otro 4x4 con reductora" className="bg-bg-main text-text-main">Otro 4x4 con reductora (Baja)</option>
                    <option value="No tengo vehículo propio" className="bg-bg-main text-text-main">No tengo vehículo propio (Ir de acompañante)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="font-display text-[10px] text-text-muted tracking-wider uppercase font-semibold">Mensaje o Consulta</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Contanos tu experiencia off-road y equipamiento actual (Malacate, eslingas, cadenas, etc.)"
                    className="w-full bg-bg-main border border-border-custom px-4 py-3 text-sm text-text-main focus:outline-none focus:border-primary rounded resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-primary hover:bg-primary-hover text-white font-display text-xs font-bold tracking-widest transition-all duration-300 rounded cursor-pointer"
                >
                  SOLICITAR RESERVA
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
