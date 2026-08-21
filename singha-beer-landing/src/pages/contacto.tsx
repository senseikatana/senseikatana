import Reveal from "~/shared/Reveal";
import Kicker from "~/shared/Kicker";
import ContactForm from "~/contact/ContactForm";
import ContactInfo from "~/contact/ContactInfo";
import FAQAccordion from "~/contact/FAQAccordion";

/**
 * Página de contacto con formulario, información de oficinas y FAQ.
 */
export default function Contact() {
  const faqItems = [
    {
      question: "¿Cómo distribuyo Singha en mi local?",
      answer:
        "Cuéntanos tu volumen mensual y tu ciudad en el formulario (asunto: Distribución). Un comercial de zona te contactará en 48 h con condiciones, catálogo y material para el punto de venta.",
    },
    {
      question: "¿Organizan catas o eventos?",
      answer:
        "Sí. Hacemos catas guiadas con el ritual completo de servido para grupos de 10 a 120 personas, en la casa de Bangkok o donde nos lleve el león. Escríbenos con fecha y aforo.",
    },
    {
      question: "¿Dónde puedo comprarla?",
      answer:
        "En más de 40 países, a través de distribuidores autorizados y nuestra tienda en línea. Escríbenos y te indicamos el punto más cercano a tu mesa.",
    },
    {
      question: "¿Prensa y colaboraciones?",
      answer:
        "Escríbenos a prensa@singha1933.com con tu medio y plazo. Respondemos en 24 h, también los días de partido.",
    },
  ];

  return (
    <div class="page-inner" id="page-contact">
      {/* Header */}
      <header class="page-header">
        <Reveal delay={0}>
          <Kicker>Contacto · Respondemos en 24 h</Kicker>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 class="page-title">
            Hablemos, con una <span class="gold">Singha</span> en la mesa.
          </h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p class="page-lead">
            Distribución, eventos, prensa o una idea que aún no tiene nombre:
            escríbenos. El león contesta.
          </p>
        </Reveal>
      </header>

      {/* Grid de contacto */}
      <Reveal delay={0.26}>
        <div class="contact-grid">
          <ContactForm />
          <ContactInfo />
        </div>
      </Reveal>

      {/* FAQ */}
      <section class="page-section">
        <Reveal delay={0}>
          <Kicker>Antes de escribir</Kicker>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 class="section-title">
            Preguntas <span class="gold">frecuentes</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <FAQAccordion items={faqItems} />
        </Reveal>
      </section>
    </div>
  );
}
