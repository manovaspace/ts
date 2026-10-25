import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: ["@manovaspace/ui", "react-date-object"],
      },
    },
  },
});
