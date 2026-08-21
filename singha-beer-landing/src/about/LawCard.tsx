interface LawCardProps {
  number: string;
  title: string;
  description: string;
  class?: string;
}

/**
 * Tarjeta de "ley de la casa" con número grande, título y descripción.
 */
export default function LawCard(props: LawCardProps) {
  return (
    <div class={`law-item ${props.class || ""}`}>
      <div class="law-number">{props.number}</div>
      <div>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
    </div>
  );
}
