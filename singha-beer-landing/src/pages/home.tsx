import { Show, createSignal, onMount } from "solid-js";
import { A } from "@solidjs/router";
import HeroSection from "~/home/HeroSection";
import ChapterSection from "~/home/ChapterSection";
import Stats from "~/shared/Stats";
import ChipList from "~/shared/ChipList";
import FlavorBar from "~/shared/FlavorBar";
import SpecItem from "~/shared/SpecItem";
import Marquee from "~/home/Marquee";
import VideoStage from "~/home/VideoStage";
import Loader from "~/layout/Loader";
import Header from "~/layout/Header";
import Footer from "~/layout/Footer";
import Reveal from "~/shared/Reveal";
import Kicker from "~/shared/Kicker";

/**
 * Página principal con todos los capítulos de la historia de Singha.
 * Sincroniza video con scroll del usuario.
 */
export default function Home() {
  const [loadProgress, setLoadProgress] = createSignal(0);
  const [videoLoaded, setVideoLoaded] = createSignal(false);
  const [videoDuration, setVideoDuration] = createSignal(30);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [currentChapter, setCurrentChapter] = createSignal("Intro");
  const [isBuffering, setIsBuffering] = createSignal(false);
  const [scrollProgress, setScrollProgress] = createSignal(0);
  const [showDots, setShowDots] = createSignal(false);

  const chapterTitles = [
    "Intro",
    "El origen",
    "El león",
    "Ingredientes",
    "El ritual",
    "El sabor",
    "La burbuja",
    "El momento",
    "La botella",
    "Salud",
  ];

  function handleVideoReady() {
    setVideoLoaded(true);
    setShowDots(true);
  }

  function handleProgressChange(progress: number) {
    setLoadProgress(progress);
  }

  function handleDurationChange(duration: number) {
    setVideoDuration(duration);
  }

  function scrollToChapter(index: number) {
    const panels = document.querySelectorAll(".panel");
    if (panels[index]) {
      window.scrollTo({
        top: (panels[index] as HTMLElement).offsetTop + 1,
        behavior: "smooth",
      });
    }
  }

  // Actualizar capítulo basado en scroll
  onMount(() => {
    function handleScroll() {
      const track = document.getElementById("track");
      if (!track) return;
      
      const vh = window.innerHeight;
      const trackH = Math.max(track.offsetHeight - vh, 1);
      const progress = Math.min(Math.max(window.scrollY / trackH, 0), 1);
      setScrollProgress(progress);
      
      // Encontrar capítulo actual
      const panels = track.querySelectorAll(".panel");
      const y = window.scrollY + vh * 0.5;
      let idx = 0;
      for (let i = 0; i < panels.length; i++) {
        if ((panels[i] as HTMLElement).offsetTop <= y) idx = i;
      }
      setCurrentChapter(chapterTitles[idx] || "Intro");
      
      // Actualizar tiempo actual del video si no está sincronizado
      if (!videoLoaded()) {
        setCurrentTime(progress * videoDuration());
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  });

  return (
    <>
      {/* Loader */}
      <Loader progress={loadProgress()} visible={!videoLoaded()} />

      {/* Video Stage */}
      <VideoStage
        videoSrc="/videos/optimizado.mp4"
        posterSrc="/images/hero-poster.webp"
        trackSelector="#track"
        onReady={handleVideoReady}
        onProgress={handleProgressChange}
        onDurationChange={handleDurationChange}
      />

      {/* Header */}
      <Header
        currentChapter={currentChapter()}
        videoDuration={videoDuration()}
        currentTime={currentTime()}
        isBuffering={isBuffering()}
        isHome={true}
      />

      {/* Dots de navegación */}
      <Show when={showDots()}>
        <nav class="dots" aria-label="Capítulos">
          {chapterTitles.map((title, i) => (
            <button
              data-label={title}
              aria-label={`Ir a ${title}`}
              onClick={() => scrollToChapter(i)}
            />
          ))}
        </nav>
      </Show>

      {/* Hint de scroll */}
      <div class={`hint ${scrollProgress() > 0.02 ? "hide" : ""}`}>
        <span class="mouse" />
        Deslízate · el video sigue tu ritmo
      </div>

      {/* Índice de capítulo */}
      <div class={`idx ${scrollProgress() > 0.02 ? "show" : ""}`}>
        <b id="idxNum">
          {String(chapterTitles.indexOf(currentChapter()) + 1).padStart(2, "0")}
        </b>
        <span id="idxTitle">{currentChapter().toUpperCase()}</span>
      </div>

      {/* Contenido principal */}
      <main id="track">
        {/* Hero */}
        <HeroSection />

        {/* Capítulo 01: El origen */}
        <ChapterSection
          number="01"
          title="1933.<br><span class='gold'>Bangkok.</span>"
          kicker="Capítulo 01 — El origen"
          description="En una Tailandia que soñaba en grande nace la primera cerveza del reino. No era una bebida más: era una declaración de orgullo nacional, elaborada con agua de manantial y una ambición dorada que todavía hoy se sirve en cada botella."
        >
          <Stats
            items={[
              {
                value: <span data-count="1933">0</span>,
                label: "Año fundacional",
              },
              {
                value: <span data-count="93">0</span>,
                label: "Años de leyenda",
              },
              {
                value: (
                  <>
                    <span data-count="100">0</span>
                    <em>%</em>
                  </>
                ),
                label: "Tailandesa",
              },
            ]}
          />
        </ChapterSection>

        {/* Capítulo 02: El león */}
        <ChapterSection
          number="02"
          title="El león que <span class='gold'>custodia</span> la receta"
          kicker="Capítulo 02 — El guardián"
          description='Cuenta la leyenda que un león dorado protegía los manantiales sagrados de Siam. Su nombre: Singha. Su promesa: fuerza, nobleza y un carácter indomable en cada sorbo. El guardián nunca se fue — vive en la etiqueta, en el relieve y en quien se atreve a brindar.'
          align="right"
        >
          <p class="note">
            <span class="thai">สิงห์</span> · «Singha» significa león en
            tailandés
          </p>
        </ChapterSection>

        {/* Capítulo 03: Ingredientes */}
        <ChapterSection
          number="03"
          title="Cuatro elementos.<br><span class='gold'>Una obsesión.</span>"
          kicker="Capítulo 03 — Los ingredientes"
          description="Nada entra en la botella sin antes demostrar que merece estar. Agua purificada de manantial, malta seleccionada grano a grano, lúpulo aromático y una levadura propia guardada bajo llave desde 1933."
        >
          <ChipList
            items={[
              "Agua de manantial",
              "Malta premium",
              "Lúpulo aromático",
              "Levadura secreta",
            ]}
          />
        </ChapterSection>

        {/* Capítulo 04: El ritual */}
        <ChapterSection
          number="04"
          title="Servida a <span class='gold'>5 °C</span>, siempre"
          kicker="Capítulo 04 — El ritual"
          description="El servido perfecto no es un detalle: es doctrina. Copa fría, inclinación de 45 grados y dos dedos de espuma cremosa que corona cada vaso. Se tarda exactamente lo que tarda un buen brindis en prepararse."
          align="right"
        >
          <Stats
            items={[
              {
                value: (
                  <>
                    <span data-count="5">0</span>
                    <em>°C</em>
                  </>
                ),
                label: "Temperatura exacta",
              },
              {
                value: (
                  <>
                    <span data-count="45">0</span>
                    <em>°</em>
                  </>
                ),
                label: "Inclinación del servido",
              },
              {
                value: <span data-count="2">0</span>,
                label: "Dedos de espuma",
              },
            ]}
          />
        </ChapterSection>

        {/* Capítulo 05: El sabor */}
        <ChapterSection
          number="05"
          title="Equilibrio <span class='gold'>dorado</span>"
          kicker="Capítulo 05 — El sabor"
          description="Un cuerpo medio y sedoso, con destellos de miel silvestre, cítricos frescos y un final de malta tostada que se despide despacio. Nada grita; todo permanece."
        >
          <div class="flavors">
            <FlavorBar label="Malta tostada" value={84} />
            <FlavorBar label="Miel silvestre" value={62} />
            <FlavorBar label="Cítricos" value={57} />
            <FlavorBar label="Lúpulo noble" value={48} />
          </div>
        </ChapterSection>

        {/* Capítulo 06: La burbuja */}
        <ChapterSection
          number="06"
          title="Carbonatación <span class='gold'>viva</span>"
          kicker="Capítulo 06 — La burbuja"
          description="Millones de burbujas finas ascienden en columna perfecta, liberando aroma en cada centímetro. La efervescencia no se ve: se escucha, se siente y se celebra."
          align="right"
          class="relative"
        >
          <Stats
            items={[
              {
                value: (
                  <>
                    <span data-count="2.6" data-dec="1" data-sep="true">
                      0
                    </span>
                    <em>vol</em>
                  </>
                ),
                label: "CO₂ natural",
              },
              {
                value: <span data-count="4000">0</span>,
                label: "Burbujas por minuto",
              },
              {
                value: (
                  <>
                    <span data-count="100">0</span>
                    <em>%</em>
                  </>
                ),
                label: "Efervescencia viva",
              },
            ]}
          />
        </ChapterSection>

        {/* Capítulo 07: El momento */}
        <ChapterSection
          number="07"
          title="De Bangkok <span class='gold'>al mundo</span>"
          kicker="Capítulo 07 — El momento"
          description="Del atardecer en un rooftop de Sukhumvit a una mesa larga en Madrid: Singha convierte cualquier encuentro en ceremonia. Porque no se bebe sola — se comparte, se brinda y se recuerda."
        >
          <div class="tags">
            <span>Atardeceres en altura</span>
            <span>Mesas largas</span>
            <span>Brindis de medianoche</span>
          </div>
        </ChapterSection>

        {/* Capítulo 08: La botella */}
        <ChapterSection
          number="08"
          title="Un icono <span class='gold'>reconocible</span> a ciegas"
          kicker="Capítulo 08 — La botella"
          description="Hombros firmes, etiqueta dorada y el león en relieve. El mismo diseño esencial desde hace décadas, porque los símbolos no se retocan: se pulen."
          align="right"
        >
          <dl class="specs">
            <SpecItem
              term="Vidrio ámbar"
              description="Protege el sabor de la luz"
            />
            <SpecItem
              term="Etiqueta dorada"
              description="El sello inconfundible del león"
            />
            <SpecItem
              term="Relieve en el hombro"
              description="Se reconoce antes de verla"
            />
          </dl>
        </ChapterSection>

        {/* Capítulo final: El brindis */}
        <section class="panel final" data-title="Salud">
          <div class="inner">
            <Reveal delay={0}>
              <Kicker>Capítulo final — El brindis</Kicker>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 class="salud">SALUD.</h2>
            </Reveal>
            <Reveal delay={0.22}>
              <p class="lead">
                Por la leyenda que se sigue sirviendo. Encuentra la tuya,
                enfríala a 5 °C y brinda despacio — como manda el león.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <div class="cta-row">
                <A href="/contacto" class="btn solid">
                  Encuentra tu Singha
                </A>
                <button
                  class="btn"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Vuelve al origen
                </button>
              </div>
            </Reveal>
          </div>

          <Marquee
            text="SINGHA ◆ NACIDA DEL ORO ◆ DESDE 1933 ◆ EL LEÓN DORADO ◆ BANGKOK · TAILANDIA ◆ SALUD ◆"
          />

          <p class="legal">
            © 2026 Singha · Bebe con responsabilidad · Solo para mayores de 18
          </p>
        </section>
      </main>
    </>
  );
}
