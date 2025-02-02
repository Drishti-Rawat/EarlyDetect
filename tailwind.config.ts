import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': ' #F6F8FD',
  				'500': '#624CF5',
  				DEFAULT: '#624CF5',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			coral: {
  				'500': '#15BF59'
  			},
  			grey: {
  				'50': '#F6F6F6',
  				'400': '#AFAFAF',
  				'500': '#757575',
  				'600': '#545454'
  			},
  			black: '#000000',
  			white: '#FFFFFF'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
