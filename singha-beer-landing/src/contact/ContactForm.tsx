import { createSignal, Show } from "solid-js";
import { A } from "@solidjs/router";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  ageVerified: boolean;
}

interface FormErrors {
  name?: boolean;
  email?: boolean;
  subject?: boolean;
  message?: boolean;
  ageVerified?: boolean;
}

/**
 * Formulario de contacto con validación client-side.
 * Incluye honeypot field oculto para protección contra spam.
 */
export default function ContactForm() {
  const [formData, setFormData] = createSignal<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    ageVerified: false,
  });
  
  const [errors, setErrors] = createSignal<FormErrors>({});
  const [submitted, setSubmitted] = createSignal(false);
  const [submitting, setSubmitting] = createSignal(false);

  function validate(): boolean {
    const newErrors: FormErrors = {};
    
    if (formData().name.trim().length < 2) {
      newErrors.name = true;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData().email)) {
      newErrors.email = true;
    }
    
    if (!formData().subject) {
      newErrors.subject = true;
    }
    
    if (formData().message.trim().length < 10) {
      newErrors.message = true;
    }
    
    if (!formData().ageVerified) {
      newErrors.ageVerified = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    
    if (!validate()) {
      // Enfocar el primer campo con error
      const firstError = document.querySelector(".field-error input, .field-error select, .field-error textarea");
      if (firstError) (firstError as HTMLElement).focus();
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Enviar a API route de SolidStart
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData()),
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Error al enviar el formulario. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      alert("Error de conexión. Por favor, verifica tu internet e intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(e: Event) {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Limpiar error del campo
    if (errors()[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  }

  function handleReset() {
    setSubmitted(false);
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      ageVerified: false,
    });
    setErrors({});
  }

  return (
    <div class="contact-grid">
      <div class="card">
        <Show
          when={!submitted()}
          fallback={
            <div class="sent">
              <div class="sent-mark" aria-hidden="true" />
              <p class="sent-title">Mensaje enviado.</p>
              <p class="sent-text">
                El león te responderá en menos de 24 horas. Mientras tanto,
                enfría una Singha a 5 °C.
              </p>
              <button class="btn" onClick={handleReset}>
                Enviar otro mensaje
              </button>
            </div>
          }
        >
          <form onSubmit={handleSubmit} novalidate>
            <p class="form-title">Escríbenos</p>
            
            {/* Honeypot field - oculto para humanos, visible para bots */}
            <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input type="text" id="website" name="website" tabindex="-1" />
            </div>
            
            <div class={`field ${errors().name ? "field-error" : ""}`}>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData().name}
                onInput={handleChange}
                placeholder="Cómo te llamas"
                autocomplete="name"
                required
              />
              <span class="field-msg">Dinos tu nombre, por favor.</span>
            </div>
            
            <div class={`field ${errors().email ? "field-error" : ""}`}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData().email}
                onInput={handleChange}
                placeholder="tu@email.com"
                autocomplete="email"
                required
              />
              <span class="field-msg">
                Necesitamos un email válido para responderte.
              </span>
            </div>
            
            <div class={`field ${errors().subject ? "field-error" : ""}`}>
              <label htmlFor="subject">Asunto</label>
              <select
                id="subject"
                name="subject"
                value={formData().subject}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un motivo…</option>
                <option value="distribucion">Distribución</option>
                <option value="prensa">Prensa & eventos</option>
                <option value="colab">Colaboraciones</option>
                <option value="otro">Otro</option>
              </select>
              <span class="field-msg">Elige un asunto.</span>
            </div>
            
            <div class={`field ${errors().message ? "field-error" : ""}`}>
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData().message}
                onInput={handleChange}
                placeholder="Cuéntanos con calma…"
                required
              />
              <span class="field-msg">Escribe al menos 10 caracteres.</span>
            </div>
            
            <label class={`age-check ${errors().ageVerified ? "age-error" : ""}`}>
              <input
                type="checkbox"
                name="ageVerified"
                checked={formData().ageVerified}
                onChange={handleChange}
                required
              />
              <i aria-hidden="true" />
              <span>
                Confirmo que soy mayor de 18 años y acepto que mis datos se
                usen solo para responderme.
              </span>
            </label>
            
            <button 
              class="btn solid" 
              type="submit"
              disabled={submitting()}
            >
              {submitting() ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </Show>
      </div>
    </div>
  );
}
