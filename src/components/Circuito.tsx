import { motion } from 'motion/react';
import { Gauge, Milestone, Clock, Snowflake, Download, Info } from 'lucide-react';
import { Tab } from '../types';

interface CircuitoProps {
  onNavigate: (tab: Tab, anchor?: string) => void;
}

export default function Circuito({ onNavigate }: CircuitoProps) {
  const handleDownload = () => {
    // Generate a simulated file download of the Roadbook
    const element = document.createElement("a");
    const file = new Blob(
      [
        "PEHUENIA 4X4 - ROADBOOK OFICIAL\n" +
        "================================\n" +
        "Circuito: Ruta de los Volcanes\n" +
        "Altitud Máxima: 1,850m\n" +
        "Distancia: 42 km\n" +
        "Dificultad: Alta / Extrema\n" +
        "Tiempo estimado: 6-8 horas\n\n" +
        "PUNTOS DE PASO:\n" +
        "1. Bosque Sumergido (Km 12) - Terreno boscoso, baja visibilidad, nieve virgen.\n" +
        "2. Filo del Viento (Km 24) - Punto de máxima altura, vista 360 de los Volcanes Lanín y Batea Mahuida.\n" +
        "3. Refugio de Piedra (Km 35) - Descenso de presiones, almuerzo de montaña y reagrupación técnica.\n\n" +
        "REQUISITOS OBLIGATORIOS:\n" +
        "- Neumáticos Mud Terrain/All Terrain con cadenas de acero de alta resistencia.\n" +
        "- Radio VHF frecuencia interna (146.520 Mhz).\n" +
        "- Equipo de rescate (eslingas, grilletes, palas de nieve, abrigo extremo)."
      ],
      { type: 'text/plain' }
    );
    element.href = URL.createObjectURL(file);
    element.download = "roadbook-ruta-volcanes.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[600px] w-full overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsBHQKc4K5Vx0HX5b1MwQjxlhqkniEoP1Q-wWG3w9SPnqJ1hHMHqAn6_WE__vwPqK4vjxapFaO_8QnfNlBXPB0ENmtBtxnZRCkFCjYD8Wn6mkyaKlEV60ReLd5RJ8WmPBRe7ZoJeRawlYeMGj8ZWIoxYXTaLJOgCutFdB83fOru2spXp5xbgtvVvy40_Uza5HC7mbA3BDUtUZZIxk6TFTh0t7Gh1WwQVtFhbhje4IpKgkzr4kObJBgaqBoLvF7nc0WDMUpq6I0XUY')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/30 to-transparent" />
        </div>
        <div className="relative z-10 px-6 md:px-16 max-w-4xl">
          <span className="font-display text-xs font-bold text-primary tracking-[0.2em] mb-4 block uppercase">EXPEDICIÓN INVERNAL</span>
          <h1 className="font-display text-3xl md:text-6xl font-extrabold text-white mb-6 uppercase leading-tight">
            Circuito y<br />
            <span className="text-primary">Exploración</span>
          </h1>
        </div>
      </section>

      {/* Circuito Details Section */}
      <section className="py-12 md:py-24 px-4 md:px-16 bg-bg-main transition-colors duration-300" id="circuito">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto">
          
          {/* Left Content: Map and Legend */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-card p-1 rounded-lg overflow-hidden relative group h-[300px] md:h-[500px]">
              <div className="absolute inset-0 pointer-events-none z-10 border border-primary/20" />
              <div 
                className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-700" 
                style={{ 
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuClHodE3kIFWAnMW9gw8iHXmIe-VN0dGRxeTNXVOfN-GM3HmX_9Y8-TTzbKG3bfNLnbjBdNwk08Fr9EK_xv4FslX2ROE_fw3yWo2bZ8Ej6NEoGBsobXn8I7LIWmUDsdLxC4QGndk4HZyhY0aCtLBe6IUxSLZmsOXFSz93Qk98X7VFto74S7MJHPi8wIiYFVAusikNyueOD91evLPSQZ3G3JdTfkDbaB2Gjf6Xn5ix2aImXWvmBzPZsiYBX_AThr2c6pd63GBZvNh_E')` 
                }}
              />
              {/* Map HUD Elements */}
              <div className="absolute top-6 left-6 p-4 glass-card border-white/5 space-y-2 pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                  <span className="font-display text-[10px] text-white uppercase font-bold tracking-wider">Live Track Active</span>
                </div>
                <div className="font-display text-primary text-sm font-semibold">ALT: 1,850M</div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 glass-card text-center flex flex-col items-center justify-center rounded">
                <Gauge className="text-primary mb-2 w-6 h-6" />
                <div className="font-display text-[10px] text-text-muted mb-1 tracking-wider uppercase font-semibold">DIFICULTAD</div>
                <div className="font-display text-lg font-bold text-text-main">ALTA</div>
              </div>
              <div className="p-6 glass-card text-center flex flex-col items-center justify-center rounded">
                <Milestone className="text-primary mb-2 w-6 h-6" />
                <div className="font-display text-[10px] text-text-muted mb-1 tracking-wider uppercase font-semibold">DISTANCIA</div>
                <div className="font-display text-lg font-bold text-text-main">42KM</div>
              </div>
              <div className="p-6 glass-card text-center flex flex-col items-center justify-center rounded">
                <Clock className="text-primary mb-2 w-6 h-6" />
                <div className="font-display text-[10px] text-text-muted mb-1 tracking-wider uppercase font-semibold">TIEMPO</div>
                <div className="font-display text-lg font-bold text-text-main">6-8H</div>
              </div>
              <div className="p-6 glass-card text-center flex flex-col items-center justify-center rounded">
                <Snowflake className="text-primary mb-2 w-6 h-6" />
                <div className="font-display text-[10px] text-text-muted mb-1 tracking-wider uppercase font-semibold">NIEVE</div>
                <div className="font-display text-lg font-bold text-text-main">+1.5M</div>
              </div>
            </div>
          </div>

          {/* Right Content: Route Description */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-text-main mb-6 border-l-4 border-primary pl-6 uppercase">
                Ruta de los Volcanes
              </h2>
              <p className="font-sans text-lg text-text-secondary leading-relaxed">
                Una travesía técnica diseñada para conductores que buscan desafiar el límite. El circuito atraviesa bosques milenarios de Araucarias y asciende por laderas volcánicas cubiertas de nieve virgen.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-display text-xs font-bold text-primary tracking-widest uppercase">PUNTOS DE INTERÉS</h3>
              
              <div className="flex gap-6 items-start">
                <div className="font-display text-2xl font-bold text-primary/40 leading-none">01</div>
                <div>
                  <h4 className="font-display text-lg font-bold text-text-main mb-2 uppercase">Bosque Sumergido</h4>
                  <p className="text-text-secondary/80 text-sm leading-relaxed">Navegación entre árboles centenarios atrapados bajo capas de hielo. Terreno de baja visibilidad y alta técnica.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="font-display text-2xl font-bold text-primary/40 leading-none">02</div>
                <div>
                  <h4 className="font-display text-lg font-bold text-text-main mb-2 uppercase">Filo del Viento</h4>
                  <p className="text-text-secondary/80 text-sm leading-relaxed">El punto más alto de la travesía. Vistas panorámicas de 360° hacia los volcanes Batea Mahuida y Lanín.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="font-display text-2xl font-bold text-primary/40 leading-none">03</div>
                <div>
                  <h4 className="font-display text-lg font-bold text-text-main mb-2 uppercase">Refugio de Piedra</h4>
                  <p className="text-text-secondary/80 text-sm leading-relaxed">Punto de reagrupamiento y fogón técnico. Zona protegida ideal para el descenso de presiones.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleDownload}
              className="w-full py-5 border border-primary text-primary hover:bg-primary hover:text-white font-display text-xs font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer rounded"
            >
              <Download className="w-4 h-4" />
              DESCARGAR ROADBOOK PDF
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 px-4 md:px-16 bg-bg-main relative overflow-hidden transition-colors duration-300">
        <div className="relative z-10 glass-card p-6 md:p-24 text-center space-y-8 max-w-5xl mx-auto border-primary/20 rounded">
          <h3 className="font-display text-2xl md:text-5xl font-extrabold text-text-main uppercase leading-tight tracking-tight">
            ¿Estás listo para el<br />
            <span className="text-primary">desierto blanco?</span>
          </h3>
          <p className="font-sans text-base md:text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Cupos limitados para la temporada invernal. No se requiere experiencia previa extrema, nuestro equipo técnico te acompaña y asiste durante toda la travesía.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button 
              onClick={() => onNavigate('quienes-somos', 'reserva-form')}
              className="bg-primary hover:bg-primary-hover text-white px-10 py-4 font-display text-xs font-bold tracking-widest transition-all duration-300 active:scale-95 shadow-xl cursor-pointer"
            >
              RESERVAR AHORA
            </button>
            <button 
              onClick={() => onNavigate('quienes-somos', 'reserva-form')}
              className="border border-border-custom text-text-main px-10 py-4 font-display text-xs font-bold tracking-widest hover:bg-glass-bg transition-all duration-300 cursor-pointer"
            >
              CONSULTAR FECHAS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
