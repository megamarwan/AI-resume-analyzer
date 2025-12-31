// postcss.config.js
export default {
  plugins: {
    // This plugin is critical for processing the Tailwind directives like @apply
    'tailwindcss': {}, 
    // This is often needed for browser compatibility prefixes
    'autoprefixer': {},
  },
}