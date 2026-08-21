import { For, createSignal, Show } from "solid-js";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  class?: string;
}

/**
 * Acordeón de preguntas frecuentes.
 * Múltiples items pueden estar abiertos simultáneamente.
 */
export default function FAQAccordion(props: FAQAccordionProps) {
  const [openItems, setOpenItems] = createSignal<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div class={`faq ${props.class || ""}`}>
      <For each={props.items}>
        {(item, index) => (
          <div class={`faq-item ${openItems().has(index()) ? "open" : ""}`}>
            <button
              onClick={() => toggle(index())}
              aria-expanded={openItems().has(index())}
              aria-controls={`faq-answer-${index()}`}
            >
              {item.question}
              <i aria-hidden="true" />
            </button>
            <div
              id={`faq-answer-${index()}`}
              class="faq-answer"
              role="region"
              style={{
                "max-height": openItems().has(index()) ? "500px" : "0",
              }}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
