/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,md,liquid,erb,serb,rb}',
    './frontend/javascript/**/*.js',
  ],
  theme: {
    extend: {
      // Tailwind's preflight reads this and applies it to <html>, so the
      // typeface actually reaches the page. The previous approach was a
      // `*:not(pre):note(code)...` rule in frontend/styles/index.css; `:note()`
      // is not a real pseudo-class, so browsers dropped the whole rule and the
      // site rendered in the system UI stack. Code/pre keep the mono stack.
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: ["fantasy"],
  },
}
