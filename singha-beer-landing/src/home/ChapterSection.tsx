import type { JSX } from "solid-js";
import Reveal from "~/shared/Reveal";
import GhostNumber from "~/shared/GhostNumber";
import Kicker from "~/shared/Kicker";

interface ChapterSectionProps {
  number: string;
  title: string;
  kicker: string;
  description: JSX.Element;
  align?: "left" | "right";
  class?: string;
  children?: JSX.Element;
}

/**
 * Template reutilizable para secciones de capítulos.
 * Reduce significativamente la duplicación de código.
 */
export default function ChapterSection(props: ChapterSectionProps) {
  return (
    <section
      class={`panel ${props.align === "right" ? "right" : ""} ${props.class || ""}`}
      data-title={props.title}
    >
      <GhostNumber align={props.align}>{props.number}</GhostNumber>

      <div class="inner">
        <Reveal delay={0}>
          <Kicker>{props.kicker}</Kicker>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 innerHTML={props.title} />
        </Reveal>

        <Reveal delay={0.16}>
          <p class="lead">{props.description}</p>
        </Reveal>

        {props.children && (
          <Reveal delay={0.26}>{props.children}</Reveal>
        )}
      </div>
    </section>
  );
}
