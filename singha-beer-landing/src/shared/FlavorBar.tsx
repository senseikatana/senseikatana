interface FlavorBarProps {
  label: string;
  value: number;
  class?: string;
}

/**
 * Barra de sabor con valor numérico.
 * Animada al entrar en el viewport.
 */
export default function FlavorBar(props: FlavorBarProps) {
  return (
    <div class={`flavor ${props.class || ""}`}>
      <span>{props.label}</span>
      <div class="flavor-bar">
        <i style={{ "--w": `${props.value}%` }} />
      </div>
      <b>{props.value}</b>
    </div>
  );
}
