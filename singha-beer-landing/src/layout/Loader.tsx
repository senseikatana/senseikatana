import { Show } from "solid-js";

interface LoaderProps {
  progress: number;
  visible: boolean;
}

/**
 * Loader con progreso de carga.
 * Se muestra mientras el video se descarga.
 */
export default function Loader(props: LoaderProps) {
  return (
    <Show when={props.visible}>
      <div
        id="loader"
        class={`loader ${props.progress >= 100 ? "done" : ""}`}
      >
        <div class="loader-mark">
          <b>S</b>
        </div>
        <div class="loader-word">SINGHA</div>
        <div class="loader-tag">NACIDA DEL ORO</div>
        <div class="loader-bar">
          <i style={{ width: `${Math.min(props.progress, 100)}%` }} />
        </div>
        <small>
          Cargando la leyenda · {Math.min(Math.round(props.progress), 100)}%
        </small>
      </div>
    </Show>
  );
}
