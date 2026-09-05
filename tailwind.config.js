/** @type {import('tailwindcss').Config} */
module.exports = {
  // Every file that can contain Tailwind class names. JS files matter:
  // script.js builds the floating HUD, join-modal success state, and
  // back-to-top button from template literals; assets/js/sti-sim.js
  // renders the STI console markup the same way.
  content: [
    './*.html',
    './documents/*.html',
    './*.js',
    './assets/js/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
