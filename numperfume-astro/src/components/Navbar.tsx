---
// Barra de navegación superior (Header)
---
<header class="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-20">
      
      <!-- Menú Móvil (Hamburguesa) -->
      <div class="flex items-center md:hidden">
        <button type="button" class="text-gray-900 hover:text-[var(--accent)] focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <!-- Logo -->
      <div class="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
        <a href="/" class="font-serif text-3xl font-bold tracking-widest text-[#1a1a1a]">
          NUM<span class="text-[var(--accent)]">.</span>
        </a>
      </div>

      <!-- Enlaces de Navegación Desktop -->
      <nav class="hidden md:flex space-x-8 items-center justify-center flex-1">
        <a href="/catalogo" class="text-xs uppercase tracking-widest font-semibold text-gray-900 hover:text-[var(--accent)] transition-colors">Todos</a>
        <a href="/mujer" class="text-xs uppercase tracking-widest font-semibold text-gray-900 hover:text-[var(--accent)] transition-colors">Mujer</a>
        <a href="/hombre" class="text-xs uppercase tracking-widest font-semibold text-gray-900 hover:text-[var(--accent)] transition-colors">Hombre</a>
        <a href="/nicho" class="text-xs uppercase tracking-widest font-semibold text-gray-900 hover:text-[var(--accent)] transition-colors">Nicho</a>
      </nav>

      <!-- Iconos (Buscador, Usuario, Carrito) -->
      <div class="flex items-center space-x-5">
        <button class="text-gray-900 hover:text-[var(--accent)] transition-colors hidden sm:block">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button class="text-gray-900 hover:text-[var(--accent)] transition-colors hidden sm:block">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button class="text-gray-900 hover:text-[var(--accent)] transition-colors relative">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span class="absolute -top-1 -right-2 bg-[var(--accent)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
        </button>
      </div>

    </div>
  </div>
</header>
