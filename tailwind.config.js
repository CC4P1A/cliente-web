import { nextui } from "@nextui-org/react";

export default {
    content: ['./src/**/*.html', './src/**/*.jsx', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [nextui()],
};
