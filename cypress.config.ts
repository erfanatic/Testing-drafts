import webpack from "@cypress/webpack-preprocessor";
import { defineConfig } from "cypress";
import merge from "lodash/merge";
import path from "path";

export default defineConfig({
  e2e: {
    video: false,
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      const defaults = webpack.defaultOptions;
      on(
        "file:preprocessor",
        webpack({
          webpackOptions: merge(defaults.webpackOptions, {
            resolve: {
              extensions: [".ts", ".tsx", ".js", ".jsx", ".cjs", ".mjs", ".json"],
              alias: {
                "@": path.join(__dirname, "..", "src"),
              },
            },
          }),
        })
      );
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
