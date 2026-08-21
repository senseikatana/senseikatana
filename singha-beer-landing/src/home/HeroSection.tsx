import Reveal from "~/shared/Reveal";
import Bubbles from "~/shared/Bubbles";
import Badge from "./Badge";

/**
 * Sección Hero principal.
 * Contiene el wordmark "SINGHA" con efecto de sombra y el tagline.
 */
export default function HeroSection() {
  return (
    <section class="panel hero" data-title="Intro">
      <Bubbles count={14} />

      <div class="inner">
        <Reveal delay={0}>
          <p class="hero-meta">
            <i />
            Cerveza premium · Est. 1933 · Bangkok, Tailandia
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 class="wordmark" aria-label="SINGHA">
            <span class="wm-outline">SINGHA</span>
            <span class="wm-fill">SINGHA</span>
          </h1>
        </Reveal>

        <Reveal delay={0.24}>
          <p class="tagline">Nacida del oro</p>
        </Reveal>

        <Reveal delay={0.36}>
          <p class="hero-sub">
            Noventa y tres años de leyenda dorada, condensados en un solo
            movimiento.{" "}
            <b>
              Cada capítulo se sirve al ritmo de tu scroll
            </b>{" "}
            — el video avanza, retrocede y se detiene contigo.
          </p>
        </Reveal>
      </div>

      <Badge />
    </section>
  );
}
