import type { JSX } from "solid-js";

interface QuoteProps {
  author: string;
  children: JSX.Element;
  class?:string;
}

/**
 * Cita destacada con comillas decorativas.
 */
export default function Quote(props: QuoteProps) {
  return (
    <blockquote class={`quote ${props.class || ""}`}>
      <p>{props.children}</p>
      <span>{props.author}</span>
    </blockquote>
  );
}
