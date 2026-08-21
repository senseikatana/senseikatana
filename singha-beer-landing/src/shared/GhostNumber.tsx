import type { JSX } from "solid-js";

interface GhostNumberProps {
  children: JSX.Element;
  align?: "left" | "right";
  class?: string;
}

/**
 * Número grande decorativo en el fondo de una sección.
 * Crea efecto visual de profundidad con texto outline.
 */
export default function GhostNumber(props: GhostNumberProps) {
  return (
    <div
      class={`ghost ${props.align === "right" ? "ghost-right" : ""} ${props.class || ""}`}
      aria-hidden="true"
    >
      {props.children}
    </div>
  );
}
