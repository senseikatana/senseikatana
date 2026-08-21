import type { JSX } from "solid-js";

interface KickerProps {
  children: JSX.Element;
  class?: string;
}

/**
 * Label decorativo con línea a la izquierda.
 * Usado como introducción a secciones.
 */
export default function Kicker(props: KickerProps) {
  return (
    <p class={`kicker ${props.class || ""}`}>
      {props.children}
    </p>
  );
}
