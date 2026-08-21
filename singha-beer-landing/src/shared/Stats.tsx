import { For, type JSX } from "solid-js";

interface StatItem {
  value: JSX.Element;
  label: string;
}

interface StatsProps {
  items: StatItem[];
  class?: string;
}

/**
 * Lista de estadísticas con valores animados.
 * Los valores usan data-count para activar la animación de contador.
 */
export default function Stats(props: StatsProps) {
  return (
    <ul class={`stats ${props.class || ""}`}>
      <For each={props.items}>
        {(item) => (
          <li>
            <b>{item.value}</b>
            <span class="stats-label">{item.label}</span>
          </li>
        )}
      </For>
    </ul>
  );
}
