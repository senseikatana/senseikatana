interface SpecItemProps {
  term: string;
  description: string;
  class?: string;
}

/**
 * Item de especificación técnica (término + descripción).
 */
export default function SpecItem(props: SpecItemProps) {
  return (
    <div class={`spec-item ${props.class || ""}`}>
      <dt>{props.term}</dt>
      <dd>{props.description}</dd>
    </div>
  );
}
