import { A } from "@solidjs/router";

interface FooterProps {
  class?: string;
}

/**
 * Footer con enlaces de navegación y información legal.
 */
export default function Footer(props: FooterProps) {
  return (
    <footer class={`ifoot ${props.class || ""}`}>
      <div>
        <p class="fb">
          <i />
          SINGHA
        </p>
        <p class="ft2">Nacida del oro · Desde 1933</p>
      </div>

      <nav class="fnav" aria-label="Pie de página">
        <A href="/">Inicio</A>
        <A href="/nosotros">Nosotros</A>
        <A href="/contacto">Contacto</A>
      </nav>

      <p class="ft">© 2026 Singha · Bebe con responsabilidad · Solo +18</p>
    </footer>
  );
}
