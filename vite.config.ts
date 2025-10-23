import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // React core libraries
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // UI libraries
          'ui-vendor': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
          ],
          
          // Data fetching and table libraries
          'data-vendor': [
            '@tanstack/react-query',
            '@tanstack/react-table',
            'axios',
          ],
          
          // PDF rendering (lazy loaded, but still large)
          'pdf-vendor': ['@react-pdf/renderer'],
          
          // Form and validation libraries
          'form-vendor': [
            'react-hook-form',
            '@hookform/resolvers',
            'zod',
          ],
          
          // Utility libraries
          'utils-vendor': [
            'date-fns',
            'lucide-react',
            'clsx',
            'tailwind-merge',
            'class-variance-authority',
          ],
        },
      },
    },
  },
});
