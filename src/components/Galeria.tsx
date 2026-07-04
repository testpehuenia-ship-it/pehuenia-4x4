import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Eye, X } from 'lucide-react';

interface Photo {
  id: string;
  url: string;
  title: string;
  category: '4X4 TRUCKS' | 'NIGHT EXPEDITION' | 'PEHUENIA LANDSCAPE';
  description: string;
}

const PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&q=80&w=1200',
    title: 'Ascenso al Cráter',
    category: '4X4 TRUCKS',
    description: 'Ford Raptor superando acumulación de nieve virgen en las laderas superiores.'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&q=80&w=1200',
    title: 'Ocaso Andino',
    category: 'PEHUENIA LANDSCAPE',
    description: 'Atardecer dorado iluminando las cumbres nevadas de la cordillera.'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&q=80&w=1200',
    title: 'Fogón de Expedición',
    category: 'NIGHT EXPEDITION',
    description: 'Fogata técnica y campamento de montaña bajo el manto de estrellas.'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1516822248537-239e256bd91a?auto=format&fit=crop&q=80&w=1200',
    title: 'Equipamiento Extremo',
    category: '4X4 TRUCKS',
    description: 'Control de cadenas para hielo y baja presión neumática reglamentaria.'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200',
    title: 'Bosque de Araucarias',
    category: 'PEHUENIA LANDSCAPE',
    description: 'Los árboles ancestrales resistiendo el gélido abrazo invernal.'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200',
    title: 'Navegación Nocturna',
    category: 'NIGHT EXPEDITION',
    description: 'Caravana de luces led guiando el camino en visibilidad reducida.'
  }
];

export default function Galeria() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | Photo['category']>('ALL');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const filteredPhotos = selectedCategory === 'ALL' 
    ? PHOTOS 
    : PHOTOS.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[250px] md:h-[400px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center opacity-40 filter grayscale"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1547989453-11e67ffb3885?auto=format&fit=crop&q=80&w=1200')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-main via-bg-main/60 to-transparent" />
        </div>
        <div className="relative z-10 px-4 text-center max-w-4xl space-y-3">
          <span className="font-display text-xs font-bold text-primary tracking-[0.3em] uppercase">REGISTRO VISUAL</span>
          <h1 className="font-display text-2xl sm:text-4xl md:text-6xl font-extrabold text-text-main uppercase tracking-tight">
            LA EXPERIENCIA EN FOTOGRAMAS
          </h1>
          <p className="font-sans text-sm md:text-base text-text-secondary max-w-lg mx-auto">
            Retratos reales de nuestras expediciones en condiciones extremas. Sin filtros, pura adrenalina patagónica.
          </p>
        </div>
      </section>

      {/* Gallery Filter and Grid */}
      <section className="py-24 px-6 md:px-16 bg-bg-main transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center">
            {['ALL', '4X4 TRUCKS', 'NIGHT EXPEDITION', 'PEHUENIA LANDSCAPE'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as any)}
                className={`font-display text-xs font-bold tracking-widest px-6 py-3 border transition-all duration-300 rounded cursor-pointer ${
                  selectedCategory === cat 
                    ? 'border-primary bg-primary text-white' 
                    : 'border-border-custom text-text-secondary/70 hover:text-text-main hover:border-border-custom bg-glass-bg'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Bento Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div
                  layout
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setSelectedPhoto(photo)}
                  className="group relative h-[320px] rounded overflow-hidden cursor-pointer bg-bg-secondary border border-border-custom"
                >
                  <div 
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${photo.url}')` }}
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-bg-main/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 flex flex-col justify-between">
                    <div className="flex justify-end">
                      <div className="p-3 bg-primary/20 border border-primary/30 rounded-full">
                        <Eye className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="font-display text-[10px] text-primary tracking-widest uppercase font-bold">{photo.category}</span>
                      <h3 className="font-display text-xl font-bold text-text-main uppercase">{photo.title}</h3>
                      <p className="font-sans text-xs text-text-secondary leading-relaxed">{photo.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Instagram CTA */}
          <div className="pt-12 text-center">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-white font-display text-xs font-bold tracking-widest transition-all duration-300 rounded"
            >
              <Instagram className="w-4 h-4" />
              VER MÁS EN INSTAGRAM
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-bg-main/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-3 text-text-secondary/50 hover:text-text-main transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="max-w-5xl w-full glass-card p-4 rounded overflow-y-auto max-h-[90vh] md:max-h-none flex flex-col md:flex-row gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="md:w-2/3 h-[250px] sm:h-[350px] md:h-[500px] flex-shrink-0">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover rounded"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/3 flex flex-col justify-center space-y-6 p-4">
                <span className="font-display text-[10px] text-primary tracking-widest uppercase font-bold border-b border-primary/25 pb-2 inline-block">
                  {selectedPhoto.category}
                </span>
                <h3 className="font-display text-3xl font-extrabold text-text-main uppercase leading-tight">
                  {selectedPhoto.title}
                </h3>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {selectedPhoto.description}
                </p>
                <div className="pt-4 border-t border-border-custom flex items-center gap-3 text-xs text-text-muted">
                  <span className="font-mono">GEAR: EXTREME WINTER EQUIPMENT</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
