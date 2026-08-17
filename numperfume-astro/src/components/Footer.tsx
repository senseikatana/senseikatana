import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-1">
            <a href="/" className="font-serif text-2xl font-bold tracking-tight text-white mb-4 block">
              NumPerfumes
            </a>
            <p className="text-gray-400 text-sm leading-relaxed">
              Perfumes personalizados y cosmética de alta calidad. Diseñados y ensamblados con pasión en Salou, Tarragona.
            </p>
          </div>
          
          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Tienda</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/shop" className="hover:text-white transition-colors">Todos los perfumes</a></li>
              <li><a href="/shop?category=hombre" className="hover:text-white transition-colors">Para Él</a></li>
              <li><a href="/shop?category=mujer" className="hover:text-white transition-colors">Para Ella</a></li>
              <li><a href="/shop?category=unisex" className="hover:text-white transition-colors">Unisex</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Atención al Cliente</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/shipping" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="/faq" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-2">Suscríbete a nuestra newsletter</p>
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Tu email" 
                  className="bg-gray-800 text-white px-4 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-brand-gold"
                />
                <button type="submit" className="bg-brand-gold text-brand-dark px-4 py-2 text-sm font-medium hover:bg-brand-gold-light transition-colors">
                  Unirse
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NumPerfumes. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0 text-sm text-gray-500">
            <a href="/privacy" className="hover:text-white transition-colors">Privacidad</a>
            <a href="/terms" className="hover:text-white transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
