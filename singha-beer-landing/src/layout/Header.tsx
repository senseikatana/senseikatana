import { A, useLocation } from "@solidjs/router";
import { Show, createMemo } from "solid-js";
import { formatTime } from "~/lib/utils/formatters";

interface HeaderProps {
  currentChapter?: string;
  videoDuration?: number;
  currentTime?: number;
  isBuffering?: boolean;
  isHome?: boolean;
}

/**
 * Header con navegación y controles de video.
 * Muestra capítulo actual y timecode solo en Home.
 */
export default function Header(props: HeaderProps) {
  const location = useLocation();
  const isHome = createMemo(() => location.pathname === "/");

  return (
    <>
      {/* Fade superior */}
      <div class="topfade" />

      {/* Barra de progreso */}
      <Show when={isHome()}>
        <div class="progress">
          <i id="progressFill" />
        </div>
      </Show>

      {/* Topbar */}
      <header class="topbar">
        <A href="/" class="brand">
          <i />
          SINGHA
        </A>

        <nav class="nav" aria-label="Principal">
          <A
            href="/"
            class={location.pathname === "/" ? "act" : ""}
          >
            Inicio
          </A>
          <A
            href="/nosotros"
            class={location.pathname === "/nosotros" ? "act" : ""}
          >
            Nosotros
          </A>
          <A
            href="/contacto"
            class={location.pathname === "/contacto" ? "act" : ""}
          >
            Contacto
          </A>
        </nav>

        <div class="top-right">
          <Show when={isHome() && props.currentChapter}>
            <span id="chapterLabel">{props.currentChapter}</span>
          </Show>
          <Show when={isHome() && props.videoDuration}>
            <span
              class={`timecode ${props.isBuffering ? "buffering" : ""}`}
            >
              <span id="tcNow">
                {props.currentTime ? formatTime(props.currentTime) : "00:00"}
              </span>
              {" / "}
              <span id="tcDur">
                {props.videoDuration
                  ? formatTime(props.videoDuration)
                  : "--:--"}
              </span>
            </span>
          </Show>
        </div>
      </header>
    </>
  );
}
