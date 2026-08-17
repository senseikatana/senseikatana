import { ArrowRight, ShieldCheck, MapPin, Truck, Lock, Star, Gift } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function Home() {
  // Select specific products for the home page sections
  const featuredProducts = PRODUCTS.filter(p => ['KAROL', 'NUM OUD', 'PISTACHO', '208Acreed'].includes(p.name));
  const favoriteProducts = PRODUCTS.filter(p => ['PISTACHO', 'TONKA', 'NICHExtreme', 'NUM OUD'].includes(p.name));

  return (
    <div className="flex flex-col min-h-screen bg-brand-light dark:bg-brand-dark transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=2000&q=80" 
            alt="NUM Perfume elegante" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 transition-colors duration-300" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <p className="text-brand-gold font-medium tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
            Perfumería Online de Autor
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight">
            Encuentra tu fragancia perfecta
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 font-light max-w-2xl mx-auto">
            Descubre perfumes de mujer y perfumes de hombre con esencia única, elaborados para quienes buscan algo diferente.
          </p>
          <a 
            href="/shop" 
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-brand-dark bg-white hover:bg-brand-gold hover:text-white transition-all duration-300"
          >
            Descubrir Colección
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-8 h-8 text-brand-gold mb-3" />
              <h3 className="font-serif text-brand-dark dark:text-white text-lg">Garantía ISO</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Calidad certificada</p>
            </div>
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 text-brand-gold mb-3" />
              <h3 className="font-serif text-brand-dark dark:text-white text-lg">Hecho en España</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Elaboración artesanal</p>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-brand-gold mb-3" />
              <h3 className="font-serif text-brand-dark dark:text-white text-lg">Envío Gratis</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">En pedidos superiores a 50€</p>
            </div>
            <div className="flex flex-col items-center">
              <Lock className="w-8 h-8 text-brand-gold mb-3" />
              <h3 className="font-serif text-brand-dark dark:text-white text-lg">Pago Seguro</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Transacciones encriptadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products (Novedades) */}
      <section className="py-20 bg-brand-light dark:bg-brand-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white mb-4">Descubre nuestras esencias</h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="/shop" 
              className="inline-block border border-brand-dark dark:border-white text-brand-dark dark:text-white px-8 py-3 hover:bg-brand-dark hover:text-white dark:hover:bg-white dark:hover:text-brand-dark transition-colors duration-300"
            >
              Ver toda la colección
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white mb-4">Descubre por categoría</h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Perfumes de Mujer', link: '/shop?category=mujer', image: 'https://images.unsplash.com/photo-1595425970377-c9703c486558?auto=format&fit=crop&w=800&q=80' },
              { title: 'Perfumes de Hombre', link: '/shop?category=hombre', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80' },
              { title: 'Perfumes Unisex', link: '/shop?category=unisex', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80' }
            ].map((category, index) => (
              <a href={category.link} key={index} className="group relative h-[400px] overflow-hidden block">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm px-8 py-4 transform transition-transform duration-500 group-hover:scale-110">
                    <h3 className="text-xl font-serif text-brand-dark dark:text-white tracking-wider">{category.title}</h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cada detalle cuenta - Packaging */}
      <section className="py-20 bg-brand-light dark:bg-brand-dark border-y border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <Gift className="w-8 h-8 text-brand-gold" />
                <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white">Cada detalle cuenta</h2>
              </div>
              <h3 className="text-xl font-medium text-brand-dark dark:text-gray-200 mb-6 tracking-wide">Packaging adicional</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed font-light">
                En NUM Perfume sabemos que la experiencia comienza antes de descubrir la fragancia. 
                Por eso, cuidamos cada detalle de nuestro packaging, montado a mano en nuestro taller 
                de Salou, para que recibir tu perfume sea un momento verdaderamente especial.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed font-light">
                Un diseño minimalista, elegante y sostenible que refleja la esencia de nuestra perfumería de autor.
              </p>
              <a 
                href="/about" 
                className="inline-flex items-center text-brand-dark dark:text-white font-medium hover:text-brand-gold dark:hover:text-brand-gold transition-colors"
              >
                Conoce más sobre nosotros
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>
            <div className="md:w-1/2 order-1 md:order-2 relative">
              <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img 
                  src="https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=80" 
                  alt="Packaging exclusivo NUM Perfume" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-gold/10 dark:bg-brand-gold/5 z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white mb-4">Los favoritos de nuestros clientes</h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto mb-8"></div>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Descubre las fragancias que más enamoran. Cada detalle cuenta en la creación de nuestras esencias.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-brand-light dark:bg-brand-dark transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brand-gold font-medium tracking-[0.2em] uppercase mb-4 text-sm">Let customers speak for us</p>
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark dark:text-white mb-4">Lo que dicen quienes nos llevan en la piel</h2>
            <div className="w-16 h-0.5 bg-brand-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'María G.', text: 'El perfume PISTACHO es increíble. Dura todo el día y siempre me preguntan qué llevo puesto. El envío fue súper rápido.' },
              { name: 'Carlos R.', text: 'Compré NICHExtreme y estoy sorprendido con la calidad. Se nota que son perfumes de autor. El packaging es de 10.' },
              { name: 'Laura M.', text: 'KAROL se ha convertido en mi fragancia diaria. Es elegante, diferente y el trato al cliente fue excepcional.' }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 p-8 shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                <div className="flex text-brand-gold mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <p className="font-serif text-brand-dark dark:text-white font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
