import { atom } from 'nanostores';

export type Language = 'es' | 'ca' | 'en' | 'fr';

const isBrowser = typeof window !== 'undefined';
const initialLang = isBrowser ? (localStorage.getItem('lang') as Language || 'es') : 'es';

export const currentLang = atom<Language>(initialLang);

if (isBrowser) {
  currentLang.listen((value) => {
    localStorage.setItem('lang', value);
  });
}

export const t = {
  es: {
    nav: { home: 'Inicio', shop: 'Colección', about: 'Nosotros' },
    about: {
      title: 'Nuestra Historia',
      subtitle: 'Artesanía y pasión desde Salou',
      p1: 'NumPerfumes nació en el corazón de Salou con una misión clara: democratizar la perfumería de autor. Creemos que cada persona merece una fragancia que cuente su propia historia.',
      p2: 'Nuestro equipo de artesanos trabaja meticulosamente en el diseño y ensamblaje del packaging de cada perfume. Cada frasco que sale de nuestro taller ha sido revisado a mano, asegurando que la presentación sea tan exquisita como la esencia que contiene.',
      p3: 'Nos inspiramos en la brisa del Mediterráneo, en la calidez de nuestra tierra y en la riqueza de los ingredientes naturales. Desde Tarragona para el mundo, enviamos nuestras creaciones con el mayor cuidado a través de InPost y agencias de confianza.',
      values: 'Nuestros Valores',
      v1_title: 'Exclusividad',
      v1_desc: 'Fragancias únicas que no encontrarás en perfumerías comerciales.',
      v2_title: 'Artesanía',
      v2_desc: 'Packaging ensamblado a mano con atención al más mínimo detalle.',
      v3_title: 'Proximidad',
      v3_desc: 'Trato cercano y envíos rápidos desde nuestras instalaciones en Salou.'
    }
  },
  ca: {
    nav: { home: 'Inici', shop: 'Col·lecció', about: 'Nosaltres' },
    about: {
      title: 'La Nostra Història',
      subtitle: 'Artesania i passió des de Salou',
      p1: 'NumPerfumes va néixer al cor de Salou amb una missió clara: democratitzar la perfumeria d\'autor. Creiem que cada persona mereix una fragància que expliqui la seva pròpia història.',
      p2: 'El nostre equip d\'artesans treballa meticulosament en el disseny i acoblament del packaging de cada perfum. Cada flascó que surt del nostre taller ha estat revisat a mà, assegurant que la presentació sigui tan exquisida com l\'essència que conté.',
      p3: 'Ens inspirem en la brisa del Mediterrani, en la calidesa de la nostra terra i en la riquesa dels ingredients naturals. Des de Tarragona per al món, enviem les nostres creacions amb la màxima cura a través d\'InPost i agències de confiança.',
      values: 'Els Nostres Valors',
      v1_title: 'Exclusivitat',
      v1_desc: 'Fragàncies úniques que no trobaràs en perfumeries comercials.',
      v2_title: 'Artesania',
      v2_desc: 'Packaging acoblat a mà amb atenció al més mínim detall.',
      v3_title: 'Proximitat',
      v3_desc: 'Tracte proper i enviaments ràpids des de les nostres instal·lacions a Salou.'
    }
  },
  en: {
    nav: { home: 'Home', shop: 'Collection', about: 'About Us' },
    about: {
      title: 'Our Story',
      subtitle: 'Craftsmanship and passion from Salou',
      p1: 'NumPerfumes was born in the heart of Salou with a clear mission: to democratize niche perfumery. We believe everyone deserves a fragrance that tells their own story.',
      p2: 'Our team of artisans works meticulously on the design and assembly of each perfume\'s packaging. Every bottle that leaves our workshop has been hand-checked, ensuring the presentation is as exquisite as the essence it contains.',
      p3: 'We are inspired by the Mediterranean breeze, the warmth of our land, and the richness of natural ingredients. From Tarragona to the world, we ship our creations with the utmost care through InPost and trusted agencies.',
      values: 'Our Values',
      v1_title: 'Exclusivity',
      v1_desc: 'Unique fragrances you won\'t find in commercial perfumeries.',
      v2_title: 'Craftsmanship',
      v2_desc: 'Hand-assembled packaging with attention to the smallest detail.',
      v3_title: 'Proximity',
      v3_desc: 'Close customer service and fast shipping from our facilities in Salou.'
    }
  },
  fr: {
    nav: { home: 'Accueil', shop: 'Collection', about: 'À Propos' },
    about: {
      title: 'Notre Histoire',
      subtitle: 'Artisanat et passion depuis Salou',
      p1: 'NumPerfumes est né au cœur de Salou avec une mission claire : démocratiser la parfumerie de niche. Nous croyons que chaque personne mérite un parfum qui raconte sa propre histoire.',
      p2: 'Notre équipe d\'artisans travaille méticuleusement sur la conception et l\'assemblage de l\'emballage de chaque parfum. Chaque flacon qui quitte notre atelier a été vérifié à la main, garantissant que la présentation est aussi exquise que l\'essence qu\'il contient.',
      p3: 'Nous sommes inspirés par la brise méditerranéenne, la chaleur de notre terre et la richesse des ingrédients naturels. De Tarragona au monde entier, nous expédions nos créations avec le plus grand soin via InPost et des agences de confiance.',
      values: 'Nos Valeurs',
      v1_title: 'Exclusivité',
      v1_desc: 'Des parfums uniques que vous ne trouverez pas dans les parfumeries commerciales.',
      v2_title: 'Artisanat',
      v2_desc: 'Emballage assemblé à la main avec une attention aux moindres détails.',
      v3_title: 'Proximité',
      v3_desc: 'Un service client de proximité et des expéditions rapides depuis nos installations à Salou.'
    }
  }
};
