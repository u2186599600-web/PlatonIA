import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/PlatonIA/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), process.env.ANALYZE === 'true' && visualizer({ filename: 'dist/stats.html', gzipSize: true, template: 'treemap' })].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Reduce noisy chunk-size warnings and split large vendor bundles
    chunkSizeWarningLimit: 600, // KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'react-vendor';
            if (id.includes('@tanstack') || id.includes('recharts')) return 'charts-vendor';
            if (id.includes('@radix-ui')) return 'radix-vendor';
            return 'vendor';
          }
        }
      }
    }
  },
}));
