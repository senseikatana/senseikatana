// App.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// ===== COMPONENTES =====
const Loader = ({ progress }) => (
  <div className={`loader ${progress >= 100 ? 'done' : ''}`}>
    <div className="loader-mark"><b>S</b></div>
    <div className="loader-word">SINGHA</div>
    <div className="loader-tag">NACIDA DEL ORO</div>
    <div className="loader-bar"><i style={{ width: `${Math.min(progress, 100)}%` }} /></div>
    <small>Cargando la leyenda · {Math.min(Math.round(progress), 100)}%</small>
  </div>
);

const Bubbles = ({ count = 16 }) => {
  const bubbles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      size: 6 + Math.random() * 22,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: -Math.random() * 18,
    }));
  }, [count]);

  return (
    <div className="bubbles">
      {bubbles.map(b => (
        <i
          key={b.id}
          style={{
            left: `${b.left}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const GhostNumber = ({ children, align = 'left' }) => (
  <div className={`ghost ${align === 'right' ? 'ghost-right' : ''}`} aria-hidden="true">
    {children}
  </div>
);

const Reveal = ({ children, delay = 0, className = '' }) => (
  <div className={`reveal ${className}`} style={{ '--delay': `${delay}s` }}>
    {children}
  </div>
);

const Kicker = ({ children }) => <p className="kicker">{children}</p>;

const Stats = ({ items }) => (
  <ul className="stats">
    {items.map((item, i) => (
      <li key={i}>
        <b>{item.value}</b>
        <span className="stats-label">{item.label}</span>
      </li>
    ))}
  </ul>
);

const ChipList = ({ items }) => (
  <ul className="chips">
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </ul>
);

const FlavorBar = ({ label, value }) => (
  <div className="flavor">
    <span>{label}</span>
    <div className="flavor-bar"><i style={{ '--w': `${value}%` }} /></div>
    <b>{value}</b>
  </div>
);

const SpecItem = ({ term, description }) => (
  <div className="spec-item">
    <dt>{term}</dt>
    <dd>{description}</dd>
  </div>
);

const TimelineItem = ({ year, title, description }) => (
  <div className="timeline-item">
    <b>{year}</b>
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

const Quote = ({ children, author }) => (
  <blockquote className="quote">
    <p>{children}</p>
    <span>{author}</span>
  </blockquote>
);

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = open ? `${contentRef.current.scrollHeight}px` : '0';
    }
  }, [open]);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button onClick={toggle}>
        {question}
        <i aria-hidden="true" />
      </button>
      <div className="faq-answer" ref={contentRef}>
        <p>{answer}</p>
      </div>
    </div>
  );
};

// ===== PÁGINAS =====
const Home = ({ videoRef, scrollProgress, currentChapter, setCurrentChapter, chapterTitles }) => {
  const trackRef = useRef(null);
  const [panelRefs] = useState(() => panels.map(() => React.createRef()));

  // Efecto para manejar la visibilidad de los paneles
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            // Activar contadores
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach((el) => {
              if (!el.dataset.done) {
                el.dataset.done = '1';
                animateCounter(el);
              }
            });
          } else {
            entry.target.classList.remove('on');
          }
        });
      },
      { threshold: 0.28, rootMargin: '-6% 0px -6% 0px' }
    );

    const panels = document.querySelectorAll('.panel');
    panels.forEach((p) => observer.observe(p));

    return () => observer.disconnect();
  }, []);

  const animateCounter = (el) => {
    const end = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.dec) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = (end * ease).toFixed(dec);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = end.toFixed(dec);
      }
    };
    requestAnimationFrame(update);
  };

  return (
    <main className="track" ref={trackRef}>
      {/* HERO */}
      <section className="panel hero" data-title="Intro">
        <Bubbles count={14} />
        <div className="inner">
          <Reveal delay={0}>
            <p className="hero-meta"><i />Cerveza premium · Est. 1933 · Bangkok, Tailandia</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="wordmark" aria-label="SINGHA">
              <span className="wm-outline">SINGHA</span>
              <span className="wm-fill">SINGHA</span>
            </h1>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="tagline">Nacida del oro</p>
          </Reveal>
          <Reveal delay={0.36}>
            <p className="hero-sub">
              Noventa y tres años de leyenda dorada, condensados en un solo movimiento.{' '}
              <b>Cada capítulo se sirve al ritmo de tu scroll</b> — el video avanza, retrocede y se detiene contigo.
            </p>
          </Reveal>
        </div>
        <svg className="badge" viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path id="badgePath" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
          </defs>
          <g className="badge-spin">
            <text fontSize="13" style={{ letterSpacing: '3px' }}>
              <textPath href="#badgePath">SINGHA · NACIDA DEL ORO · DESDE 1933 ·</textPath>
            </text>
          </g>
          <rect className="badge-core" x="86" y="86" width="28" height="28" transform="rotate(45 100 100)" />
          <text className="badge-s" x="100" y="108" textAnchor="middle">S</text>
        </svg>
      </section>

      {/* EL ORIGEN */}
      <section className="panel" data-title="El origen">
        <GhostNumber>01</GhostNumber>
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo 01 — El origen</Kicker></Reveal>
          <Reveal delay={0.08}>
            <h2>1933.<br /><span className="gold">Bangkok.</span></h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              En una Tailandia que soñaba en grande nace la primera cerveza del reino. No era una bebida más: era una declaración de orgullo nacional, elaborada con agua de manantial y una ambición dorada que todavía hoy se sirve en cada botella.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <Stats items={[
              { value: <span data-count="1933">0</span>, label: 'Año fundacional' },
              { value: <span data-count="93">0</span>, label: 'Años de leyenda' },
              { value: <><span data-count="100">0</span><em>%</em></>, label: 'Tailandesa' },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* EL LEÓN */}
      <section className="panel right" data-title="El león">
        <GhostNumber align="right">02</GhostNumber>
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo 02 — El guardián</Kicker></Reveal>
          <Reveal delay={0.08}>
            <h2>El león que <span className="gold">custodia</span> la receta</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              Cuenta la leyenda que un león dorado protegía los manantiales sagrados de Siam. Su nombre: Singha. Su promesa: fuerza, nobleza y un carácter indomable en cada sorbo. El guardián nunca se fue — vive en la etiqueta, en el relieve y en quien se atreve a brindar.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="note"><span className="thai">สิงห์</span> · «Singha» significa león en tailandés</p>
          </Reveal>
        </div>
      </section>

      {/* INGREDIENTES */}
      <section className="panel" data-title="Ingredientes">
        <GhostNumber>03</GhostNumber>
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo 03 — Los ingredientes</Kicker></Reveal>
          <Reveal delay={0.08}>
            <h2>Cuatro elementos.<br /><span className="gold">Una obsesión.</span></h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              Nada entra en la botella sin antes demostrar que merece estar. Agua purificada de manantial, malta seleccionada grano a grano, lúpulo aromático y una levadura propia guardada bajo llave desde 1933.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <ChipList items={['Agua de manantial', 'Malta premium', 'Lúpulo aromático', 'Levadura secreta']} />
          </Reveal>
        </div>
      </section>

      {/* EL RITUAL */}
      <section className="panel right" data-title="El ritual">
        <GhostNumber align="right">04</GhostNumber>
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo 04 — El ritual</Kicker></Reveal>
          <Reveal delay={0.08}>
            <h2>Servida a <span className="gold">5&nbsp;°C</span>, siempre</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              El servido perfecto no es un detalle: es doctrina. Copa fría, inclinación de 45 grados y dos dedos de espuma cremosa que corona cada vaso. Se tarda exactamente lo que tarda un buen brindis en prepararse.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <Stats items={[
              { value: <><span data-count="5">0</span><em>°C</em></>, label: 'Temperatura exacta' },
              { value: <><span data-count="45">0</span><em>°</em></>, label: 'Inclinación del servido' },
              { value: <span data-count="2">0</span>, label: 'Dedos de espuma' },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* EL SABOR */}
      <section className="panel" data-title="El sabor">
        <GhostNumber>05</GhostNumber>
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo 05 — El sabor</Kicker></Reveal>
          <Reveal delay={0.08}>
            <h2>Equilibrio <span className="gold">dorado</span></h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              Un cuerpo medio y sedoso, con destellos de miel silvestre, cítricos frescos y un final de malta tostada que se despide despacio. Nada grita; todo permanece.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="flavors">
              <FlavorBar label="Malta tostada" value={84} />
              <FlavorBar label="Miel silvestre" value={62} />
              <FlavorBar label="Cítricos" value={57} />
              <FlavorBar label="Lúpulo noble" value={48} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* LA BURBUJA */}
      <section className="panel right" data-title="La burbuja">
        <GhostNumber align="right">06</GhostNumber>
        <Bubbles count={26} />
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo 06 — La burbuja</Kicker></Reveal>
          <Reveal delay={0.08}>
            <h2>Carbonatación <span className="gold">viva</span></h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              Millones de burbujas finas ascienden en columna perfecta, liberando aroma en cada centímetro. La efervescencia no se ve: se escucha, se siente y se celebra.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <Stats items={[
              { value: <><span data-count="2.6" data-dec="1">0</span><em>vol</em></>, label: 'CO₂ natural' },
              { value: <span data-count="4000">0</span>, label: 'Burbujas por minuto' },
              { value: <><span data-count="100">0</span><em>%</em></>, label: 'Efervescencia viva' },
            ]} />
          </Reveal>
        </div>
      </section>

      {/* EL MOMENTO */}
      <section className="panel" data-title="El momento">
        <GhostNumber>07</GhostNumber>
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo 07 — El momento</Kicker></Reveal>
          <Reveal delay={0.08}>
            <h2>De Bangkok <span className="gold">al mundo</span></h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              Del atardecer en un rooftop de Sukhumvit a una mesa larga en Madrid: Singha convierte cualquier encuentro en ceremonia. Porque no se bebe sola — se comparte, se brinda y se recuerda.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <div className="tags">
              <span>Atardeceres en altura</span>
              <span>Mesas largas</span>
              <span>Brindis de medianoche</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LA BOTELLA */}
      <section className="panel right" data-title="La botella">
        <GhostNumber align="right">08</GhostNumber>
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo 08 — La botella</Kicker></Reveal>
          <Reveal delay={0.08}>
            <h2>Un icono <span className="gold">reconocible</span> a ciegas</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead">
              Hombros firmes, etiqueta dorada y el león en relieve. El mismo diseño esencial desde hace décadas, porque los símbolos no se retocan: se pulen.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <dl className="specs">
              <SpecItem term="Vidrio ámbar" description="Protege el sabor de la luz" />
              <SpecItem term="Etiqueta dorada" description="El sello inconfundible del león" />
              <SpecItem term="Relieve en el hombro" description="Se reconoce antes de verla" />
            </dl>
          </Reveal>
        </div>
      </section>

      {/* FINAL */}
      <section className="panel final" data-title="Salud">
        <div className="inner">
          <Reveal delay={0}><Kicker>Capítulo final — El brindis</Kicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="salud">SALUD.</h2>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="lead">
              Por la leyenda que se sigue sirviendo. Encuentra la tuya, enfríala a 5&nbsp;°C y brinda despacio — como manda el león.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="cta-row">
              <Link to="/contacto" className="btn solid">Encuentra tu Singha</Link>
              <button className="btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Vuelve al origen
              </button>
            </div>
          </Reveal>
        </div>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-lane">
            <span className="marquee-group">SINGHA <i>◆</i> NACIDA DEL ORO <i>◆</i> DESDE 1933 <i>◆</i> EL LEÓN DORADO <i>◆</i> BANGKOK · TAILANDIA <i>◆</i> SALUD <i>◆</i></span>
            <span className="marquee-group">SINGHA <i>◆</i> NACIDA DEL ORO <i>◆</i> DESDE 1933 <i>◆</i> EL LEÓN DORADO <i>◆</i> BANGKOK · TAILANDIA <i>◆</i> SALUD <i>◆</i></span>
          </div>
        </div>
        <p className="legal">© 2026 Singha · Bebe con responsabilidad · Solo para mayores de 18</p>
      </section>
    </main>
  );
};

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach((el) => {
              if (!el.dataset.done) {
                el.dataset.done = '1';
                animateCounter(el);
              }
            });
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
    );

    document.querySelectorAll('#page-about .reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const animateCounter = (el) => {
    const end = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.dec) || 0;
    const duration = 1400;
    const startTime = performance.now();

    const update = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = (end * ease).toFixed(dec);
      el.textContent = value;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = end.toFixed(dec);
      }
    };
    requestAnimationFrame(update);
  };

  return (
    <div className="page-inner" id="page-about">
      <header className="page-header">
        <Reveal delay={0}><Kicker>La casa Singha · Desde 1933</Kicker></Reveal>
        <Reveal delay={0.08}>
          <h1 className="page-title">Nacida del <span className="gold">oro</span>.<br />Forjada en Bangkok.</h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="page-lead">
            Antes de ser una cerveza, Singha fue una promesa: que el reino de Siam tendría una bebida a la altura de sus templos dorados. Esta es la casa que la cumple, sorbo a sorbo, desde 1933.
          </p>
        </Reveal>
      </header>

      <section className="page-section">
        <div className="card">
          <Kicker>1933 → 2026</Kicker>
          <h2 className="card-title">Una línea de <span className="gold">tiempo</span> dorada</h2>
          <div className="timeline">
            <TimelineItem year="1933" title="El primer hervor" description="Un maestro cervecero siamés recorre Europa y vuelve a Bangkok con una obsesión: que su reino beba su propia cerveza. Abre la primera cervecería del país." />
            <TimelineItem year="1939" title="El león cruza el río" description="Las primeras cajas viajan a los países vecinos. El león dorado empieza a rugir fuera de Siam." />
            <TimelineItem year="1962" title="La botella definitiva" description="Hombros firmes, vidrio ámbar, etiqueta de oro. Nace la silueta que hoy se reconoce con los ojos cerrados." />
            <TimelineItem year="1993" title="El mundo brinda" description="Medallas internacionales y una mesa en cada continente. La receta, intacta." />
            <TimelineItem year="2026" title="La leyenda se sirve" description="Noventa y tres años después, la misma levadura guarda el mismo secreto. Y el león sigue en su puesto." />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="duo">
          <figure className="photo">
            <img src="https://image.qwenlm.ai/public_source/cfde7066-b28d-4594-9a52-d01d7ee541f9/1434647c7-8dc6-40b4-8833-afec18aee343.png" alt="Alambiques de cobre humeantes" loading="lazy" />
            <figcaption>Bangkok · Sala de cocción, turno de noche</figcaption>
          </figure>
          <div className="duo-text">
            <Kicker>La cervecería</Kicker>
            <h2>Cobre, vapor y <span className="gold">paciencia</span></h2>
            <p>Dentro de la sala de cocción el tiempo se mide en hervores, no en minutos. Los alambiques de cobre originales siguen en servicio, porque hay cosas que la tecnología mejora y otras que simplemente respeta.</p>
            <p>Cada lote se prueba contra el lote de 1933, conservado en archivo. Si no sabe a entonces, no sale a la calle.</p>
          </div>
        </div>
      </section>

      <section className="page-section">
        <Kicker>Lo que no se negocia</Kicker>
        <h2 className="section-title">Tres leyes de la <span className="gold">casa</span></h2>
        <div className="law-list">
          <div className="law-item">
            <div className="law-number">01</div>
            <div>
              <h3>Paciencia</h3>
              <p>Nueve días de fermentación y ni una hora menos. El oro no se apresura: se forma.</p>
            </div>
          </div>
          <div className="law-item">
            <div className="law-number">02</div>
            <div>
              <h3>Precisión</h3>
              <p>5&nbsp;°C en la copa, 45° en el servido, dos dedos de espuma. Medimos lo que otros llaman detalles.</p>
            </div>
          </div>
          <div className="law-item">
            <div className="law-number">03</div>
            <div>
              <h3>Orgullo</h3>
              <p>El león no se imprime: se graba a relieve. Lo que representa no cabe en tinta.</p>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div><b><span data-count="93">0</span></b><span>Años de oficio</span></div>
          <div><b><span data-count="4">0</span></b><span>Ingredientes</span></div>
          <div><b><span data-count="5">0</span><em>°C</em></b><span>Siempre</span></div>
          <div><b><span data-count="40">0</span><em>+</em></b><span>Países</span></div>
        </div>
      </section>

      <section className="page-section">
        <div className="duo reverse">
          <figure className="photo">
            <img src="https://image.qwenlm.ai/public_source/cfde7066-b28d-4594-9a52-d01d7ee541f9/17cb3d306-2b02-4426-9b26-95fe6983983d.png" alt="Emblema del león dorado" loading="lazy" />
            <figcaption>El guardián · Oro de 22 quilates</figcaption>
          </figure>
          <div className="duo-text">
            <Kicker>El símbolo</Kicker>
            <h2>Un león que <span className="gold">no se retoca</span></h2>
            <p>El emblema ha cambiado menos que la receta: prácticamente nada. Trazo art déco, dorado de 22 quilates sobre papel de arroz, y la mirada hacia el este, por donde sale el sol de Bangkok.</p>
            <p className="note"><span className="thai">สิงห์</span> · Singha significa «león» en tailandés</p>
          </div>
        </div>
      </section>

      <Quote author="— Primer maestro cervecero de la casa, 1933">
        El oro no se encuentra.<br /><b>Se destila.</b>
      </Quote>

      <section className="cta-band">
        <div className="card">
          <div>
            <h2>¿Hablamos?</h2>
            <p>Distribución, eventos, prensa o simplemente una buena historia que contar: la mesa está puesta.</p>
          </div>
          <div className="cta-row">
            <Link to="/contacto" className="btn solid">Ir a contacto</Link>
            <Link to="/" className="btn">Volver a la leyenda</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    age: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formState.name.trim().length < 2) newErrors.name = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = true;
    if (!formState.subject) newErrors.subject = true;
    if (formState.message.trim().length < 10) newErrors.message = true;
    if (!formState.age) newErrors.age = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      // Aquí iría la lógica de envío
      console.log('Formulario enviado:', formState);
    } else {
      // Enfocar el primer campo con error
      const firstError = document.querySelector('.field-error input, .field-error select, .field-error textarea');
      if (firstError) firstError.focus();
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormState({ name: '', email: '', subject: '', message: '', age: false });
    setErrors({});
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll('#page-contact .reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-inner" id="page-contact">
      <header className="page-header">
        <Reveal delay={0}><Kicker>Contacto · Respondemos en 24 h</Kicker></Reveal>
        <Reveal delay={0.08}>
          <h1 className="page-title">Hablemos, con una <span className="gold">Singha</span> en la mesa.</h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="page-lead">Distribución, eventos, prensa o una idea que aún no tiene nombre: escríbenos. El león contesta.</p>
        </Reveal>
      </header>

      <div className="contact-grid">
        <div className="card">
          {!submitted ? (
            <form onSubmit={handleSubmit} noValidate>
              <p className="form-title">Escríbenos</p>
              <div className={`field ${errors.name ? 'field-error' : ''}`}>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Cómo te llamas"
                  autoComplete="name"
                />
                <span className="field-msg">Dinos tu nombre, por favor.</span>
              </div>
              <div className={`field ${errors.email ? 'field-error' : ''}`}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  autoComplete="email"
                />
                <span className="field-msg">Necesitamos un email válido para responderte.</span>
              </div>
              <div className={`field ${errors.subject ? 'field-error' : ''}`}>
                <label htmlFor="subject">Asunto</label>
                <select id="subject" name="subject" value={formState.subject} onChange={handleChange}>
                  <option value="">Selecciona un motivo…</option>
                  <option value="distribucion">Distribución</option>
                  <option value="prensa">Prensa &amp; eventos</option>
                  <option value="colab">Colaboraciones</option>
                  <option value="otro">Otro</option>
                </select>
                <span className="field-msg">Elige un asunto.</span>
              </div>
              <div className={`field ${errors.message ? 'field-error' : ''}`}>
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos con calma…"
                />
                <span className="field-msg">Escribe al menos 10 caracteres.</span>
              </div>
              <label className={`age-check ${errors.age ? 'age-error' : ''}`}>
                <input type="checkbox" name="age" checked={formState.age} onChange={handleChange} />
                <i aria-hidden="true" />
                <span>Confirmo que soy mayor de 18 años y acepto que mis datos se usen solo para responderme.</span>
              </label>
              <button className="btn solid" type="submit">Enviar mensaje</button>
            </form>
          ) : (
            <div className="sent">
              <div className="sent-mark" aria-hidden="true" />
              <p className="sent-title">Mensaje enviado.</p>
              <p className="sent-text">El león te responderá en menos de 24 horas. Mientras tanto, enfría una Singha a 5&nbsp;°C.</p>
              <button className="btn" onClick={handleReset}>Enviar otro mensaje</button>
            </div>
          )}
        </div>

        <aside className="contact-info">
          <div className="info-block">
            <h4>Oficinas</h4>
            <p><strong>Casa madre · Bangkok</strong><br />999 Sukhumvit Soi 24, 10110, Tailandia</p>
            <p><strong>Delegación Europa · Madrid</strong><br />Calle del Oro 19, 28014, España</p>
          </div>
          <div className="info-block">
            <h4>Directo</h4>
            <p><a href="mailto:hola@singha1933.com">hola@singha1933.com</a></p>
            <p><a href="mailto:prensa@singha1933.com">prensa@singha1933.com</a></p>
            <p><a href="tel:+6620001933">+66 2 000 1933</a></p>
          </div>
          <div className="info-block">
            <h4>Horario</h4>
            <p>Lunes a viernes · 9:00–18:00 (GMT+7)<br />Fines de semana: solo el león despierto.</p>
          </div>
          <div className="info-block">
            <h4>Síguenos</h4>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">YouTube</a>
            </div>
          </div>
          <figure className="photo compact">
            <img src="https://image.qwenlm.ai/public_source/cfde7066-b28d-4594-9a52-d01d7ee541f9/1f432c959-4130-413f-9727-5b16993927f5.png" alt="Dos cervezas en rooftop" loading="lazy" />
            <figcaption>Rooftop de la casa · Sukhumvit, 19:42</figcaption>
          </figure>
        </aside>
      </div>

      <section className="page-section">
        <Kicker>Antes de escribir</Kicker>
        <h2 className="section-title">Preguntas <span className="gold">frecuentes</span></h2>
        <div className="faq">
          <FAQItem
            question="¿Cómo distribuyo Singha en mi local?"
            answer="Cuéntanos tu volumen mensual y tu ciudad en el formulario (asunto: Distribución). Un comercial de zona te contactará en 48&nbsp;h con condiciones, catálogo y material para el punto de venta."
          />
          <FAQItem
            question="¿Organizan catas o eventos?"
            answer="Sí. Hacemos catas guiadas con el ritual completo de servido para grupos de 10 a 120 personas, en la casa de Bangkok o donde nos lleve el león. Escríbenos con fecha y aforo."
          />
          <FAQItem
            question="¿Dónde puedo comprarla?"
            answer="En más de 40 países, a través de distribuidores autorizados y nuestra tienda en línea. Escríbenos y te indicamos el punto más cercano a tu mesa."
          />
          <FAQItem
            question="¿Prensa y colaboraciones?"
            answer="Escríbenos a prensa@singha1933.com con tu medio y plazo. Respondemos en 24&nbsp;h, también los días de partido."
          />
        </div>
      </section>
    </div>
  );
};

// ===== COMPONENTE PRINCIPAL =====
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(30);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isHome, setIsHome] = useState(true);

  const chapterTitles = [
    'Intro', 'El origen', 'El león', 'Ingredientes',
    'El ritual', 'El sabor', 'La burbuja', 'El momento',
    'La botella', 'Salud'
  ];

  // Detectar ruta actual
  useEffect(() => {
    setIsHome(location.pathname === '/');
  }, [location]);

  // Control del video
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMetadata = () => {
      setVideoDuration(video.duration || 30);
      setVideoReady(true);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        const pct = (buffered / video.duration) * 100;
        setProgress(pct);
        if (pct >= 55 && !loaded) {
          setLoaded(true);
        }
      }
    };

    const handleCanPlay = () => {
      setVideoReady(true);
      setLoaded(true);
    };

    const handleError = () => {
      document.body.classList.add('no-video');
      setLoaded(true);
    };

    const handleWaiting = () => setIsBuffering(true);
    const handlePlaying = () => setIsBuffering(false);

    video.addEventListener('loadedmetadata', handleMetadata);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('seeked', handlePlaying);
    video.addEventListener('pause', handlePlaying);

    // Timeout de seguridad
    const timeout = setTimeout(() => {
      if (!loaded) {
        document.body.classList.add('no-video');
        setLoaded(true);
      }
    }, 10000);

    return () => {
      video.removeEventListener('loadedmetadata', handleMetadata);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('seeked', handlePlaying);
      video.removeEventListener('pause', handlePlaying);
      clearTimeout(timeout);
    };
  }, [loaded]);

  // Sincronizar video con scroll (solo en home)
  useEffect(() => {
    if (!isHome || !videoReady || !videoRef.current) return;

    const video = videoRef.current;
    let smooth = 0;
    let rafId = null;

    const updateVideo = (target) => {
      smooth += (target - smooth) * 0.12;
      if (Math.abs(target - smooth) < 0.0004) smooth = target;

      const t = smooth * Math.max(videoDuration - 0.06, 0);

      // Actualizar progreso
      document.documentElement.style.setProperty('--p', smooth.toFixed(4));

      // Buscar frame
      const diff = t - video.currentTime;
      const absDiff = Math.abs(diff);

      if (absDiff < 0.02) {
        if (!video.paused) video.pause();
      } else if (absDiff > 1.6) {
        if (!video.paused) video.pause();
        try { video.fastSeek(t); } catch { video.currentTime = t; }
      } else if (diff > 0 && absDiff > 0.12) {
        const rate = Math.min(Math.max(absDiff * 5, 0.6), 8);
        if (video.paused) video.play().catch(() => {});
        if (Math.abs(video.playbackRate - rate) > 0.04) {
          try { video.playbackRate = rate; } catch {}
        }
      } else {
        if (!video.paused) video.pause();
        if (absDiff > 0.035) {
          try { video.fastSeek(t); } catch { video.currentTime = t; }
        }
      }

      // Actualizar timecode
      const tcNow = document.getElementById('tcNow');
      if (tcNow) {
        const secs = Math.max(0, Math.floor(video.currentTime));
        tcNow.textContent = `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;
      }

      // Actualizar barra de progreso
      const fill = document.getElementById('progressFill');
      if (fill) {
        fill.style.transform = `scaleX(${smooth.toFixed(4)})`;
      }
    };

    const handleScroll = () => {
      const track = document.getElementById('track');
      if (!track) return;
      const vh = window.innerHeight;
      const trackH = Math.max(track.offsetHeight - vh, 1);
      const target = Math.min(Math.max(window.scrollY / trackH, 0), 1);
      setScrollProgress(target);

      // Actualizar capítulo actual
      const panels = document.querySelectorAll('.panel');
      const y = window.scrollY + vh * 0.5;
      let idx = 0;
      for (let i = 0; i < panels.length; i++) {
        if (panels[i].offsetTop <= y) idx = i;
      }
      setCurrentChapter(idx);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateVideo(target));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger inicial
    setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHome, videoReady, videoDuration]);

  // Control de modo de video según ruta
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoReady) return;

    if (isHome) {
      video.loop = false;
      video.playbackRate = 1;
      video.pause();
    } else {
      video.loop = true;
      video.playbackRate = 1;
      if (!document.body.classList.contains('no-video')) {
        video.play().catch(() => {});
      }
    }
  }, [isHome, videoReady]);

  // Efecto de carga
  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('done');
      }, 600);
    }
  }, [loaded]);

  // Navegación suave
  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Loader progress={progress} />

      {/* ESCENARIO */}
      <div className="stage" aria-hidden="true">
        <video
          ref={videoRef}
          src="https://andresweb26.com/videos/optimizado.mp4"
          muted
          playsInline
          webkitPlaysInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
        />
        <div className="stage-fallback" />
        <div className="shade" />
        <div className="tint" />
        <div className="vignette" />
        <div className="grain" />
        <Bubbles count={10} />
      </div>

      {/* UI FIJA */}
      <div className="topfade" />
      <div className="progress"><i id="progressFill" /></div>

      <header className="topbar">
        <Link to="/" className="brand" onClick={(e) => handleNavClick(e, '/')}>
          <i />SINGHA
        </Link>
        <nav className="nav" aria-label="Principal">
          <Link to="/" className={location.pathname === '/' ? 'act' : ''} onClick={(e) => handleNavClick(e, '/')}>
            Inicio
          </Link>
          <Link to="/nosotros" className={location.pathname === '/nosotros' ? 'act' : ''} onClick={(e) => handleNavClick(e, '/nosotros')}>
            Nosotros
          </Link>
          <Link to="/contacto" className={location.pathname === '/contacto' ? 'act' : ''} onClick={(e) => handleNavClick(e, '/contacto')}>
            Contacto
          </Link>
        </nav>
        <div className="top-right">
          <span id="chapterLabel">{isHome ? chapterTitles[currentChapter] || 'Intro' : '—'}</span>
          <span className={`timecode ${isBuffering ? 'buffering' : ''}`}>
            <span id="tcNow">00:00</span> / <span id="tcDur">{videoDuration ? `${Math.floor(videoDuration / 60)}:${String(Math.floor(videoDuration % 60)).padStart(2, '0')}` : '--:--'}</span>
          </span>
        </div>
      </header>

      {isHome && (
        <>
          <nav className="dots" aria-label="Capítulos">
            {chapterTitles.map((title, i) => (
              <button
                key={i}
                className={i === currentChapter ? 'act' : ''}
                data-label={title}
                aria-label={`Ir a ${title}`}
                onClick={() => {
                  const panels = document.querySelectorAll('.panel');
                  if (panels[i]) {
                    window.scrollTo({ top: panels[i].offsetTop + 1, behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </nav>
          <div className={`hint ${scrollProgress > 0.02 ? 'hide' : ''}`}>
            <span className="mouse" />
            Deslízate · el video sigue tu ritmo
          </div>
          <div className={`idx ${scrollProgress > 0.02 ? 'show' : ''}`}>
            <b id="idxNum">{String(currentChapter + 1).padStart(2, '0')}</b>
            <span id="idxTitle">{chapterTitles[currentChapter]?.toUpperCase() || 'INTRO'}</span>
          </div>
        </>
      )}

      {/* RUTAS */}
      <Routes>
        <Route path="/" element={<Home {...{ videoRef, scrollProgress, currentChapter, setCurrentChapter, chapterTitles }} />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>

      {/* FOOTER */}
      <footer className="ifoot">
        <div>
          <p className="fb"><i />SINGHA</p>
          <p className="ft2">Nacida del oro · Desde 1933</p>
        </div>
        <nav className="fnav" aria-label="Pie de página">
          <Link to="/" onClick={(e) => handleNavClick(e, '/')}>Inicio</Link>
          <Link to="/nosotros" onClick={(e) => handleNavClick(e, '/nosotros')}>Nosotros</Link>
          <Link to="/contacto" onClick={(e) => handleNavClick(e, '/contacto')}>Contacto</Link>
        </nav>
        <p className="ft">© 2026 Singha · Bebe con responsabilidad · Solo +18</p>
      </footer>
    </>
  );
};

// ===== WRAPPER CON ROUTER =====
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;