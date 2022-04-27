import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { cdnHooks } from './config/cdn';
import { createHtmlPlugin as html } from 'vite-plugin-html';
import { resolve } from 'path';
import createPostcssConfig from './config/postcss.config';
import { visualizer } from 'rollup-plugin-visualizer';

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
      visualizer((opts) => {
        // 会打包到dist/analyze.html
        return { filename: resolve(opts.dir, 'analyze.html') };
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
      sourcemap: env.VITE_SOURCEMAP === 'true',
    },
    esbuild: {
      // 移除console, debugger; 只会在build下去除
      drop: (() => {
        const drop: Array<'console' | 'debugger'> = [];
        env.VITE_BUILD_DROP_CONSOLE === 'true' && drop.push('console');
        env.VITE_BUILD_DROP_DEBUGGER === 'true' && drop.push('debugger');
        return drop;
      })(),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    css: {
      // dev时生成sourcemap
      devSourcemap: env.VITE_SOURCEMAP === 'true',
      preprocessorOptions: {
        scss: {
          // 这样就能全局使用 src/common/styles/variable.scss 定义的 变量
          // 注意⚠️：只导入变量或函数，公共类不要这样导入，建议用@improt的方式导入，否则每一个scoped组件都会生成一个公共类
          additionalData: `@import "src/common/styles/variable.scss";`,
          // build时不能生成sourcemap
          // sourceMap: {},
        },
      },
      postcss: createPostcssConfig(env),
    },
    server: {
      // port: 3000,
      open: false, //自动打开
      base: './ ', //生产环境路径
      proxy:
        env.VITE_USE_PROXY === 'true'
          ? {
              // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
              // 正则表达式写法
              '^/api': {
                target: env.VITE_PROXY_TARGET, // 后端服务实际地址
                changeOrigin: true, //开启代理
                rewrite: (path) => path.replace(/^\/api/, ''),
              },
            }
          : undefined,
    },
  };
  // 处理production时的config.build.rollupOptions.plugins
  handleProductionCdn(config);
  return config;
});
