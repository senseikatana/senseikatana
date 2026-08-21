import { For } from "solid-js";

interface MarqueeProps {
  text: string;
  repeat?: number;
  class?: string;
}

/**
 * Texto marquee animado horizontalmente.
 * Se duplica para crear efecto continuo.
 */
export default function Marquee(props: MarqueeProps) {
  const repeat = () => props.repeat || 2;
  const items = () => Array.from({ length: repeat() }, () => props.text);

  return (
    <div class={`marquee ${props.class || ""}`} aria-hidden="true">
      <div class="marquee-lane">
        <For each={items()}>
          {(text) => <span class="marquee-group">{text}</span>}
        </For>
      </div>
    </div>
  );
}
