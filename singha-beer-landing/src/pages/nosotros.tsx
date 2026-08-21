import Reveal from "~/shared/Reveal";
import Kicker from "~/shared/Kicker";
import TimelineItem from "~/about/TimelineItem";
import LawCard from "~/about/LawCard";
import StatsGrid from "~/about/StatsGrid";
import Quote from "~/about/Quote";

/**
 * Página "Nosotros" con historia, valores y línea de tiempo de Singha.
 */
export default function About() {
  return (
    <div class="page-inner" id="page-about">
      {/* Header */}
      <header class="page-header">
        <Reveal delay={0}>
          <Kicker>La casa Singha · Desde 1933</Kicker>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 class="page-title">
            Nacida del <span class="gold">oro</span>.
            <br />
            Forjada en Bangkok.
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p class="page-lead">
            Antes de ser una cerveza, Singha fue una promesa: que el reino de
            Siam tendría una bebida a la altura de sus templos dorados. Esta es
            la casa que la cumple, sorbo a sorbo, desde 1933.
          </p>
        </Reveal>
      </header>

      {/* Timeline */}
      <section class="page-section">
        <div class="card">
          <Reveal delay={0}>
            <Kicker>1933 → 2026</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 class="card-title">
              Una línea de <span class="gold">tiempo</span> dorada
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <div class="timeline">
              <TimelineItem
                year="1933"
                title="El primer hervor"
                description="Un maestro cervecero siamés recorre Europa y vuelve a Bangkok con una obsesión: que su reino beba su propia cerveza. Abre la primera cervecería del país."
              />
              <TimelineItem
                year="1939"
                title="El león cruza el río"
                description="Las primeras cajas viajan a los países vecinos. El león dorado empieza a rugir fuera de Siam."
              />
              <TimelineItem
                year="1962"
                title="La botella definitiva"
                description="Hombros firmes, vidrio ámbar, etiqueta de oro. Nace la silueta que hoy se reconoce con los ojos cerrados."
              />
              <TimelineItem
                year="1993"
                title="El mundo brinda"
                description="Medallas internacionales y una mesa en cada continente. La receta, intacta."
              />
              <TimelineItem
                year="2026"
                title="La leyenda se sirve"
                description="Noventa y tres años después, la misma levadura guarda el mismo secreto. Y el león sigue en su puesto."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cervecería */}
      <section class="page-section">
        <div class="duo">
          <Reveal delay={0}>
            <figure class="photo">
              <img
                src="/images/cerveceria.webp"
                alt="Alambiques de cobre humeantes en la sala de cocción de la cervecería Singha en Bangkok"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
              <figcaption>Bangkok · Sala de cocción, turno de noche</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div class="duo-text">
              <Kicker>La cervecería</Kicker>
              <h2>
                Cobre, vapor y <span class="gold">paciencia</span>
              </h2>
              <p>
                Dentro de la sala de cocción el tiempo se mide en hervores, no
                en minutos. Los alambiques de cobre originales siguen en
                servicio, porque hay cosas que la tecnología mejora y otras que
                simplemente respeta.
              </p>
              <p>
                Cada lote se prueba contra el lote de 1933, conservado en
                archivo. Si no sabe a entonces, no sale a la calle.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leyes de la casa */}
      <section class="page-section">
        <Reveal delay={0}>
          <Kicker>Lo que no se negocia</Kicker>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 class="section-title">
            Tres leyes de la <span class="gold">casa</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <div class="law-list">
            <LawCard
              number="01"
              title="Paciencia"
              description="Nueve días de fermentación y ni una hora menos. El oro no se apresura: se forma."
            />
            <LawCard
              number="02"
              title="Precisión"
              description="5 °C en la copa, 45° en el servido, dos dedos de espuma. Medimos lo que otros llaman detalles."
            />
            <LawCard
              number="03"
              title="Orgullo"
              description="El león no se imprime: se graba a relieve. Lo que representa no cabe en tinta."
            />
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <StatsGrid
            items={[
              {
                value: <span data-count="93">0</span>,
                label: "Años de oficio",
              },
              {
                value: <span data-count="4">0</span>,
                label: "Ingredientes",
              },
              {
                value: (
                  <>
                    <span data-count="5">0</span>
                    <em>°C</em>
                  </>
                ),
                label: "Siempre",
              },
              {
                value: (
                  <>
                    <span data-count="40">0</span>
                    <em>+</em>
                  </>
                ),
                label: "Países",
              },
            ]}
          />
        </Reveal>
      </section>

      {/* El símbolo */}
      <section class="page-section">
        <div class="duo reverse">
          <Reveal delay={0}>
            <figure class="photo">
              <img
                src="/images/leon-dorado.webp"
                alt="Emblema heráldico del león dorado de Singha en estilo art déco"
                loading="lazy"
                decoding="async"
                width="600"
                height="400"
              />
              <figcaption>El guardián · Oro de 22 quilates</figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.1}>
            <div class="duo-text">
              <Kicker>El símbolo</Kicker>
              <h2>
                Un león que <span class="gold">no se retoca</span>
              </h2>
              <p>
                El emblema ha cambiado menos que la receta: prácticamente nada.
                Trazo art déco, dorado de 22 quilates sobre papel de arroz, y
                la mirada hacia el este, por donde sale el sol de Bangkok.
              </p>
              <p class="note">
                <span class="thai">สิงห์</span> · Singha significa «león» en
                tailandés
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cita */}
      <Reveal delay={0}>
        <Quote author="— Primer maestro cervecero de la casa, 1933">
          El oro no se encuentra.
          <br />
          <b>Se destila.</b>
        </Quote>
      </Reveal>

      {/* CTA */}
      <section class="cta-band">
        <Reveal delay={0}>
          <div class="card">
            <div>
              <h2>¿Hablamos?</h2>
              <p>
                Distribución, eventos, prensa o simplemente una buena historia
                que contar: la mesa está puesta.
              </p>
            </div>
            <div class="cta-row">
              <a href="/contacto" class="btn solid">
                Ir a contacto
              </a>
              <a href="/" class="btn">
                Volver a la leyenda
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
