import { For, type JSX } from "solid-js";

interface StatsGridItem {
  value: JSX.Element;
  label: string;
}

interface StatsGridProps {
  items: StatsGridItem[];
  class?: string;
}

/**
 * Grid de estadísticas con bordes decorativos.
 */
export default function StatsGrid(props: StatsGridProps) {
  return (
    <div class={`stats-grid ${props.class || ""}`}>
      <For each={props.items}>
        {(item) => (
          <div>
            <b>{item.value}</b>
            <span>{item.label}</span>
          </div>
        )}
      </For>
    </div>
  );
}
