import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/*": "src/*",
      "@components": "src/components/index",
      "@components/*": "src/components/*",
      "@hooks": "src/hooks/index",
      "@hooks/*": "src/hooks/*",
      "@interfaces/*": "src/hooks/*",
      "@services": "src/services/index",
      "@services/*": "./src/services/*",
      "@utils": "./src/utils/index",
      "@utils/*": "./src/utils/*",
      "@pages": "./src/pages/index",
      "@pages/*": "./src/pages/*",
      "@styles/*": "./src/styles/*",
    },
  },
});
