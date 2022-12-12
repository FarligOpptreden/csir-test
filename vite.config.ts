import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const sharedConfig: any = {
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
};

const aliases = {
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
};

const mapAliases = (command: string) => {
  const toReturn = {};

  Object.keys(aliases).forEach((key) => {
    let value = aliases[key];

    if (command === "build" && /.+index$/.test(value)) value += ".ts";

    toReturn[key] = value;
  });

  return toReturn;
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    ...sharedConfig,
    resolve: {
      alias: { ...mapAliases(command) },
    },
  };
});
