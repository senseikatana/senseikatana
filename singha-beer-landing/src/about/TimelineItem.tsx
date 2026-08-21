interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  class?: string;
}

/**
 * Item de línea de tiempo con año, título y descripción.
 */
export default function TimelineItem(props: TimelineItemProps) {
  return (
    <div class={`timeline-item ${props.class || ""}`}>
      <b>{props.year}</b>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
    </div>
  );
}
