export interface JsDependence {
  name: string; // global object key
  var: string; // global object value
  url: string;
}

export interface Dependence {
  // 插入到index.html
  js: JsDependence[];
  // 插入到index.html
  css: string[];
}
