import { For, createMemo } from "solid-js";

interface BubblesProps {
  count?: number;
  class?: string;
}

/**
 * Burbujas animadas decorativas.
 * Genera elementos con animación random para simular carbonatación.
 */
export default function Bubbles(props: BubblesProps) {
  const count = () => props.count || 16;
  
  const bubbles = createMemo(() => {
    return Array.from({ length: count() }, (_, i) => ({
      id: i,
      size: 6 + Math.random() * 22,
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: -Math.random() * 18,
    }));
  });

  return (
    <div class={`bubbles ${props.class || ""}`}>
      <For each={bubbles()}>
        {(b) => (
          <i
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              "animation-duration": `${b.duration}s`,
              "animation-delay": `${b.delay}s`,
            }}
          />
        )}
      </For>
    </div>
  );
}
