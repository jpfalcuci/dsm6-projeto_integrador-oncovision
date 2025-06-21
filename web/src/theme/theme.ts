import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: '#e84c88' },
        primaryLight: { value: '#f7dae6' },
        primaryDark: { value: '#c23a6b' },
        secondary: { value: '#4a5568' },
        light: { value: '#f5f7fa' },
        dark: { value: '#2d3748' },
        darkSecondary: { value: '#2c3e50' },
        input: { value: '#ddd' },
        success: { value: '#48bb78' },
        warning: { value: '#ed8936' },
        error: { value: '#e53e3e' },
        neutral: { value: '#363795' },
        neutralDark: { value: '#252684' },
        badgeMalignant: { value: 'rgba(231, 76, 60, 0.1)' },
        badgeBenign: { value: 'rgba(46, 204, 113, 0.1)' },
        greyLight: { value: '#eee' },
      },
      fonts: {
        body: { value: 'Rubik, sans-serif' },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
