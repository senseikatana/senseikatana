/**
 * Badge SVG giratorio con texto circular.
 * Elemento decorativo en el hero section.
 */
export default function Badge() {
  return (
    <svg class="badge" viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path
          id="badgePath"
          d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0"
        />
      </defs>
      <g class="badge-spin">
        <text
          font-size="13"
          style={{ "letter-spacing": "3px" }}
        >
          <textPath href="#badgePath">
            SINGHA · NACIDA DEL ORO · DESDE 1933 ·
          </textPath>
        </text>
      </g>
      <rect
        class="badge-core"
        x="86"
        y="86"
        width="28"
        height="28"
        transform="rotate(45 100 100)"
      />
      <text class="badge-s" x="100" y="108" text-anchor="middle">
        S
      </text>
    </svg>
  );
}
