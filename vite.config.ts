import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { cdnHooks } from './config/cdn';
import { createHtmlPlugin as html } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env: ImportMetaEnv = loadEnv(mode, __dirname) as any;
  const { getCdnInjectData, handleProductionCdn } = cdnHooks(env);
  const config: UserConfig = {
    base: env.VITE_BASE_PATH,
    plugins: [
      vue(),
      html({
        inject: {
          data: {
            injectTitle: env.VITE_APP_TITLE,
            injectLang: env.VITE_APP_LANG,
            ...getCdnInjectData(),
          },
        },
        minify: true,
      }),
    ],
    build: {
      rollupOptions: {
        plugins: [],
      },
      sourcemap: env.VITE_BUILD_SOURCEMAP,
    },
  };
  // 处理production时的config.build.rollupOptions.plugins
  handleProductionCdn(config);
  return config;
});
