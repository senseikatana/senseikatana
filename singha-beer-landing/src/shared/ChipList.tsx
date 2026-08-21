import { For, type JSX } from "solid-js";

interface ChipListProps {
  items: string[];
  class?: string;
}

/**
 * Lista de chips/tags con estilo de tarjeta.
 */
export default function ChipList(props: ChipListProps) {
  return (
    <ul class={`chips ${props.class || ""}`}>
      <For each={props.items}>
        {(item) => <li>{item}</li>}
      </For>
    </ul>
  );
}
