/** @type {import('tailwindcss').Config} */

// Every colour is a token defined in frontend/styles/tokens.css. Tailwind only
// gives them utility names, so there is exactly one place to change a colour.
// Trade-off: opacity modifiers (bg-surface/50) do not work on a var() colour.
// Add an explicit token instead of reaching for /50.
const tokenColors = {
  canvas: "var(--canvas)",
  surface: "var(--surface)",
  "surface-2": "var(--surface-2)",
  "surface-3": "var(--surface-3)",
  line: "var(--line)",
  "line-strong": "var(--line-strong)",
  "line-interactive": "var(--line-interactive)",
  ink: "var(--ink)",
  "ink-2": "var(--ink-2)",
  "ink-3": "var(--ink-3)",
  accent: "var(--accent)",
  "accent-text": "var(--accent-text)",
  "accent-soft": "var(--accent-soft)",
  gold: "var(--gold)",
  "gold-text": "var(--gold-text)",
  steel: "var(--steel)",
  "steel-text": "var(--steel-text)",
};

module.exports = {
  content: [
    "./src/**/*.{html,md,liquid,erb,serb,rb}",
    "./frontend/javascript/**/*.js",
  ],
  theme: {
    extend: {
      colors: tokenColors,
      fontFamily: {
        // Preflight applies fontFamily.sans to <html>, so body text inherits it.
        // Code and <pre> keep fontFamily.mono via preflight.
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        serif: ["var(--font-display)"],
      },
      borderRadius: {
        // Corners are square. The only radius in the system is 2px, on chips
        // and buttons. No rounded corners anywhere else, photos included.
        spec: "2px",
      },
      maxWidth: {
        shell: "var(--shell)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        // TRANSITIONAL. Mirrors the token palette so pages that still use
        // daisyUI components stay coherent while they are migrated one by one.
        // This entry, and daisyUI itself, go away when the last page is moved
        // onto the token components. Values here must match the black ramp in
        // tokens.css.
        spec: {
          primary: "#e5484d",
          "primary-content": "#090807",
          secondary: "#aca69b",
          accent: "#e5484d",
          neutral: "#332c24",
          "neutral-content": "#f0ece4",
          "base-100": "#1a1611",
          "base-200": "#090807",
          "base-300": "#2a231c",
          "base-content": "#f0ece4",
          info: "#8fbfd9",
          success: "#9cc77b",
          warning: "#c9a227",
          error: "#e5484d",
          "--rounded-box": "0px",
          "--rounded-btn": "2px",
          "--rounded-badge": "2px",
          "--animation-btn": "0.12s",
          "--border-btn": "1px",
        },
      },
    ],
  },
};
