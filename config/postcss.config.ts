import type * as Postcss from 'postcss';

// rem配置
function handleRem(env: ImportMetaEnv, plugins: Postcss.Plugin[]) {
  if (env.VITE_USE_REM !== 'true') return;

  plugins.unshift(
    require('postcss-px-to-viewport')({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      // viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'rem', // 指定需要转换成的视窗单位，建议使用rem
      selectorBlackList: ['.rem-ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
    }),
  );
}

/**
 * css tree shaking 配置
 *
 * 如果写的css class不存在写的html上，那么该css会被删除掉，写到safelist上就不会被删除了
 *
 * 不识别js变量组装的class，不是很推荐使用
 *
 * @param {ImportMetaEnv} env
 * @param {Plugin[]} plugins
 * @return {any[]}
 */
function handleTreeShaking(env: ImportMetaEnv, plugins: Postcss.Plugin[]) {
  if (env.VITE_MODE_NAME !== 'production') return;

  plugins.unshift(
    require('@fullhuman/postcss-purgecss')({
      content: [`./*.html`, `./src/**/*.html`, `./src/**/*.vue`],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      skippedContentGlobs: ['node_modules/**'],
      safelist: [
        // element-ui S
        /^el-.*/,
      ],
    }),
  );
}

export default function createPostcssConfig(env: ImportMetaEnv): Postcss.ProcessOptions & {
  plugins: Postcss.Plugin[];
} {
  const config: ReturnType<typeof createPostcssConfig> = {
    plugins: [
      // .browserslistrc是autoprefixer的配置
      // 可优化点；如果以后热更新慢，autoprefixer可以build时再使用，现在开启是保持跟生产环境一致
      require("autoprefixer")(),
      // require("cssnano")(), // 压缩css，vite会压缩不需要再配置
    ],
  };
  handleRem(env, config.plugins);
  handleTreeShaking(env, config.plugins);
  return config;
}
