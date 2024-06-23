import sharedConfig from '@chatvolt/config-tailwind';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./js/**/*.{js,ts,jsx,tsx}', '../ui/src/**/*.{js,ts,jsx,tsx}'],
  presets: [sharedConfig],
};
