import type { Product } from '../store/cart';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'KAROL',
    description: 'Perfume Unisex Ámbar Amaderado. Una fragancia envolvente que deja una estela inolvidable.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    category: 'unisex',
    notes: ['Ámbar', 'Maderas nobles', 'Especias cálidas']
  },
  {
    id: '2',
    name: 'PISTACHO',
    description: 'Perfume Unisex Floral Frutal Gourmand. Una delicia olfativa dulce y adictiva.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1595425970377-c9703c486558?auto=format&fit=crop&w=600&q=80',
    category: 'unisex',
    notes: ['Pistacho', 'Vainilla', 'Flores blancas']
  },
  {
    id: '3',
    name: 'NICHExtreme',
    description: 'Perfume masculino inspirado en una icónica fragancia de nicho. Potencia y elegancia extrema.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    category: 'hombre',
    notes: ['Bergamota', 'Pimienta negra', 'Ambroxan']
  },
  {
    id: '4',
    name: 'TONKA',
    description: 'Perfume femenino Oriental Floral. Sensualidad pura con el toque cálido del haba tonka.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    category: 'mujer',
    notes: ['Haba Tonka', 'Jazmín', 'Almendra']
  },
  {
    id: '5',
    name: 'Nich24 ERBA',
    description: 'Perfume Unisex Cítrica Aromática. Una explosión de frescura mediterránea y hierbas aromáticas.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1615397323184-b0a68c4fa036?auto=format&fit=crop&w=600&q=80',
    category: 'unisex',
    notes: ['Limón Siciliano', 'Bergamota', 'Hierbas aromáticas']
  },
  {
    id: '6',
    name: '208Acreed',
    description: 'Perfume masculino Chipre frutal nicho. Fresco, afrutado y con un fondo ahumado inconfundible.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    category: 'hombre',
    notes: ['Piña', 'Abedul', 'Musgo de roble']
  },
  {
    id: '7',
    name: 'AMOUR',
    description: 'Perfume femenino Floral Afrutado. Romántico, delicado y lleno de luz.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80',
    category: 'mujer',
    notes: ['Rosa', 'Lichi', 'Almizcle blanco']
  },
  {
    id: '8',
    name: 'NUM OUD',
    description: 'Unisex Amaderado Especiado. El misterio de oriente encapsulado en una fragancia profunda.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    category: 'unisex',
    notes: ['Madera de Oud', 'Azafrán', 'Pachulí']
  },
  {
    id: '9',
    name: 'AURORA',
    description: 'Perfume femenino chipre floral dulce. Un amanecer radiante lleno de vitalidad y dulzura.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1595425970377-c9703c486558?auto=format&fit=crop&w=600&q=80',
    category: 'mujer',
    notes: ['Flores blancas', 'Notas dulces', 'Pachulí']
  },
  {
    id: '10',
    name: 'FARA',
    description: 'Perfume masculino Almizcle Amaderado Floral. Elegancia atemporal con un toque contemporáneo.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    category: 'hombre',
    notes: ['Almizcle', 'Maderas', 'Toques florales']
  },
  {
    id: '11',
    name: 'DOLCE ONE',
    description: 'Perfume femenino Oriental Floral. Una declaración de intenciones, audaz y seductora.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1615397323184-b0a68c4fa036?auto=format&fit=crop&w=600&q=80',
    category: 'mujer',
    notes: ['Vainilla', 'Jazmín', 'Ámbar']
  },
  {
    id: '12',
    name: 'GOLD',
    description: 'Perfume masculino Aromática. El estándar de oro en fragancias para el hombre moderno.',
    sizes: [
      { size: '50ml', price: 30.00 },
      { size: '100ml', price: 45.00 },
      { size: '150ml', price: 60.00 }
    ],
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    category: 'hombre',
    notes: ['Notas aromáticas', 'Maderas', 'Especias']
  }
];
