import { onMount, type JSX } from "solid-js";

interface RevealProps {
  delay?: number;
  class?: string;
  children: JSX.Element;
}

/**
 * Componente que revela su contenido con animación al entrar en el viewport.
 * Usa IntersectionObserver para detección de visibilidad.
 */
export default function Reveal(props: RevealProps) {
  let ref!: HTMLDivElement;

  onMount(() => {
    if (!ref) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("on");
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    
    observer.observe(ref);
  });

  return (
    <div
      ref={ref}
      class={`reveal ${props.class || ""}`}
      style={{ "--delay": `${props.delay || 0}s` }}
    >
      {props.children}
    </div>
  );
}
