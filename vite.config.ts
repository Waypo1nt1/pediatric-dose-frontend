import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
            '/drug-dose-media': {
                target: 'http://localhost:9000',
                changeOrigin: true,
            },
        },
    },
})
