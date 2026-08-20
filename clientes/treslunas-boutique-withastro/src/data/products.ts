import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'vestido-midi-lino-beige',
    name: 'Vestido Midi Lino Beige',
    category: 'Vestidos',
    price: 149.95,
    originalPrice: 179.95,
    description: 'Confeccionado en lino natural transpirable de alta calidad. Este vestido atemporal cuenta con un corte fluido y detalles sutiles que realzan la silueta.',
    adviceFromErika: 'El consejo de Erika: Combínalo con sandalias de cuero y un bolso de rafia para un look de verano sofisticado en el paseo marítimo de Cambrils.',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Beige Natural', hex: '#E2D5C3', bgClass: 'bg-[#E2D5C3]' },
      { name: 'Verde Oliva', hex: '#707851', bgClass: 'bg-[#707851]' },
      { name: 'Blanco Lino', hex: '#FFFFFF', bgClass: 'bg-white border border-gray-300' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    featured: true,
    completeTheLookIds: ['sandalias-cuero-artesanal', 'bolso-de-rafia']
  },
  {
    id: 'luna-maxi-dress',
    name: 'Luna Maxi Dress',
    category: 'Vestidos',
    price: 120.00,
    originalPrice: 150.00,
    description: 'Espectacular vestido largo plisado de noche en tono noche profunda. Caída vaporosa con espalda descubierta y escote pronunciado.',
    adviceFromErika: 'La pieza definitiva para eventos nocturnos. Erika sugiere llevarlo con los pendientes Sol en acabado bronce.',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Negro Azabache', hex: '#1A1A1A', bgClass: 'bg-[#1A1A1A]' },
      { name: 'Azul Noche', hex: '#1B263B', bgClass: 'bg-[#1B263B]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    isBestseller: true,
    featured: true,
    completeTheLookIds: ['selenite-moon-necklace', 'pendientes-sol']
  },
  {
    id: 'selenite-moon-necklace',
    name: 'Selenite Moon Necklace',
    category: 'Joyería',
    price: 45.00,
    description: 'Colgante artesanal de cuarzo selenita tallado en forma de luna creciente sobre cadena de plata o baño de oro rosado.',
    adviceFromErika: 'Una gema llena de energía celestial que captura la luz de forma mágica.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591475111-a83a0026e64d?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Plata Natural', hex: '#C0C0C0', bgClass: 'bg-[#C0C0C0]' },
      { name: 'Oro Cobre', hex: '#B87333', bgClass: 'bg-[#B87333]' }
    ],
    sizes: ['One Size'],
    featured: true
  },
  {
    id: 'bolsa-clasica-cuero',
    name: 'Bolsa Clásica de Cuero',
    category: 'Accesorios',
    price: 120.00,
    description: 'Bolso de mano estructurado en piel vacuna tratada vegetalmente con herrajes dorados en acabado cepillado.',
    adviceFromErika: 'Espacioso, elegante y con asa bandolera extraíble. Ideal para el día a día.',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Negro Mate', hex: '#111111', bgClass: 'bg-[#111111]' },
      { name: 'Siena Cuero', hex: '#8B4513', bgClass: 'bg-[#8B4513]' }
    ],
    sizes: ['Única'],
    isBestseller: true,
    featured: true
  },
  {
    id: 'pendientes-sol',
    name: 'Pendientes Sol',
    category: 'Joyería',
    price: 45.00,
    description: 'Pendientes abanico de inspiración solar mediterránea con textura plisada en latón bañado en oro de 18k.',
    adviceFromErika: 'Aportan un destello de vitalidad a cualquier estilismo monocromático.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Oro Bronce', hex: '#D4AF37', bgClass: 'bg-[#D4AF37]' }
    ],
    sizes: ['Única'],
    featured: true
  },
  {
    id: 'foulard-seda-estampado',
    name: 'Foulard Seda Estampado',
    category: 'Accesorios',
    price: 60.00,
    description: 'Pañuelo 100% seda natural con estampa geométrica inspirada en las lunas y astros mediterráneos.',
    adviceFromErika: 'Llévalo al cuello, anudado al bolso o en el cabello para un toque chic instantáneo.',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584030373081-f37b7bb33805?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Crema / Cobre', hex: '#FDF6ED', bgClass: 'bg-[#FDF6ED] border border-gray-300' }
    ],
    sizes: ['Única'],
    featured: true
  },
  {
    id: 'vestido-luna-creciente',
    name: 'Vestido Luna Creciente',
    category: 'Vestidos',
    price: 89.99,
    originalPrice: 110.00,
    description: 'Vestido etéreo de gasa en tono champaña / nude con tirantes finos ajustables y falda con movimiento.',
    adviceFromErika: 'Sencillo, refinado y extremadamente cómodo para cenas al aire libre.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Nude Rosa', hex: '#E8C3B9', bgClass: 'bg-[#E8C3B9]' },
      { name: 'Azul Grisáceo', hex: '#7A8B99', bgClass: 'bg-[#7A8B99]' }
    ],
    sizes: ['S', 'M', 'L'],
    isNew: true
  },
  {
    id: 'vestido-fibrame-tops',
    name: 'Top Halter Seda Fibrame',
    category: 'Top & Blusas',
    price: 89.99,
    description: 'Blusa fluida de seda satinada con cuello halter cruzado y cierre posterior delicado.',
    adviceFromErika: 'El complemento ideal para pantalones de talle alto y pendientes de fiesta.',
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Champaña', hex: '#F0E6D2', bgClass: 'bg-[#F0E6D2]' },
      { name: 'Negro Satinado', hex: '#1C1C1C', bgClass: 'bg-[#1C1C1C]' }
    ],
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: 'vestido-luna-jewelry',
    name: 'Conjunto Joyas Luna Mística',
    category: 'Joyería',
    price: 79.99,
    description: 'Juego de gargantilla y pendientes con piedras de nácar natural en engaste de bronce metálico.',
    adviceFromErika: 'Aporta una elegancia sobria y celestial a cualquier look formal.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Nácar Cobre', hex: '#CFA886', bgClass: 'bg-[#CFA886]' }
    ],
    sizes: ['Única']
  },
  {
    id: 'vestido-lino-natisto',
    name: 'Camisa Lino Natisto Noir',
    category: 'Top & Blusas',
    price: 89.99,
    description: 'Blusa negra atemporal de manga larga confeccionada en mezcla de ramio y lino orgánico.',
    adviceFromErika: 'Inigualable para entretiempo. Erika la combina con pantalones marfil.',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Negro', hex: '#0F0F0F', bgClass: 'bg-[#0F0F0F]' }
    ],
    sizes: ['S', 'M', 'L']
  },
  {
    id: 'vestido-maritnito',
    name: 'Vestido Satinado Maritnito',
    category: 'Vestidos',
    price: 89.99,
    description: 'Vestido lencero de satén con escote drapeado en espalda y tirantes cruzados.',
    adviceFromErika: 'Sensualidad sutil con el sello característico de 3 Lunas.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Negro Noche', hex: '#141414', bgClass: 'bg-[#141414]' }
    ],
    sizes: ['XS', 'S', 'M']
  },
  {
    id: 'sandalias-cuero-artesanal',
    name: 'Sandalias de Cuero Artesanal',
    category: 'Accesorios',
    price: 89.95,
    description: 'Sandalias planas multitiras de piel curtida en España con suela de cuero natural mullido.',
    adviceFromErika: 'Procesadas por artesanos locales de la zona de Tarragona. Puro confort y estilo.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Cuero Natural', hex: '#9E5B32', bgClass: 'bg-[#9E5B32]' }
    ],
    sizes: ['36', '37', '38', '39', '40', '41']
  },
  {
    id: 'bolso-de-rafia',
    name: 'Bolso de Rafia Cambrils',
    category: 'Accesorios',
    price: 59.95,
    description: 'Capazo de rafia natural tejida a mano con asas de piel de vacuno en color avellana.',
    adviceFromErika: 'El accesorio estival por excelencia para pasear por Cambrils.',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Rafia / Marrón', hex: '#D2B48C', bgClass: 'bg-[#D2B48C]' }
    ],
    sizes: ['Única']
  }
];
