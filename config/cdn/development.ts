import type { Dependence } from './interface';
import commonDependence from './common';

// 开发环境的依赖cdn
const development: Dependence = {
  js: [...commonDependence.js],
  css: [...commonDependence.css],
};
export default development;
