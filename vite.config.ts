import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { cdnHooks } from './config/cdn';
import { createHtmlPlugin as html } from 'vite-plugin-html';
import { resolve } from 'path';

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
      // terserOptions: {
      //   compress: {
      //     drop_console: env.VITE_BUILD_DROP_CONSOLE,
      //   },
      // },
      sourcemap: env.VITE_BUILD_SOURCEMAP,
    },
    esbuild: {
      // 移除console, debugger; 只会在build下去除
      drop: [
        (env.VITE_BUILD_DROP_CONSOLE && 'console') || undefined,
        (env.VITE_BUILD_DROP_DEBUGGER && 'debugger') || undefined,
      ],
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
  // 处理production时的config.build.rollupOptions.plugins
  handleProductionCdn(config);
  return config;
});
