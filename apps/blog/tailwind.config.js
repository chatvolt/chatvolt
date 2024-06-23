import sharedConfig from '@chatvolt/config-tailwind';

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [sharedConfig],
};
