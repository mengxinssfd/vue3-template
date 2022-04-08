import { Dependence } from './interface';

// 公共依赖cdn：开发环境和生产环境共有的cdn
const commonDependence: Dependence = {
  css: ['https://cdn.staticfile.org/minireset.css/0.0.2/minireset.min.css'],
  js: [],
};

export default commonDependence;
