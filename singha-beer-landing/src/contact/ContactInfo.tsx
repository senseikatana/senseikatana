/**
 * Información de contacto y oficinas.
 * Incluye dirección, email, teléfono y redes sociales.
 */
export default function ContactInfo() {
  return (
    <aside class="contact-info">
      <div class="info-block">
        <h4>Oficinas</h4>
        <p>
          <strong style={{ color: "var(--color-gold)" }}>
            Casa madre · Bangkok
          </strong>
          <br />
          999 Sukhumvit Soi 24, 10110, Tailandia
        </p>
        <p style={{ "margin-top": "0.6rem" }}>
          <strong style={{ color: "var(--color-gold)" }}>
            Delegación Europa · Madrid
          </strong>
          <br />
          Calle del Oro 19, 28014, España
        </p>
      </div>

      <div class="info-block">
        <h4>Directo</h4>
        <p>
          <a href="mailto:hola@singha1933.com">hola@singha1933.com</a>
        </p>
        <p>
          <a href="mailto:prensa@singha1933.com">prensa@singha1933.com</a>
        </p>
        <p>
          <a href="tel:+6620001933">+66 2 000 1933</a>
        </p>
      </div>

      <div class="info-block">
        <h4>Horario</h4>
        <p>
          Lunes a viernes · 9:00–18:00 (GMT+7)
          <br />
          Fines de semana: solo el león despierto.
        </p>
      </div>

      <div class="info-block">
        <h4>Síguenos</h4>
        <div class="social-links">
          <a href="#" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
        </div>
      </div>

      <figure class="photo compact">
        <img
          src="/images/rooftop.webp"
          alt="Dos cervezas doradas sobre una mesa en un rooftop de Bangkok al atardecer"
          loading="lazy"
          decoding="async"
          width="600"
          height="400"
        />
        <figcaption>Rooftop de la casa · Sukhumvit, 19:42</figcaption>
      </figure>
    </aside>
  );
}
