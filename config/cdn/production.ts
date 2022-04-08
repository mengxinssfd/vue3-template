import type { Dependence } from './interface';
import commonDependence from './common';
import { dependencies } from '../../package.json';

// 生产环境的依赖cdn
const production: Dependence = {
  js: [
    {
      name: 'vue',
      var: 'Vue',
      url: `https://cdn.staticfile.org/vue/${dependencies['vue'].replace(
        '^',
        '',
      )}/vue.global.prod.min.js`,
    },
    ...commonDependence.js,
  ],
  css: [...commonDependence.css],
};
export default production;
