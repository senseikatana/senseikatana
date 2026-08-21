import { A } from "@solidjs/router";

/**
 * Skip link para accesibilidad de teclado.
 * Permite saltar directamente al contenido principal.
 */
export default function SkipLink() {
  return (
    <A href="#main-content" class="skip-link">
      Saltar al contenido principal
    </A>
  );
}
