// 参考文档：https://cn.vitejs.dev/guide/env-and-mode.html
interface ImportMetaEnv {
  readonly VITE_MODE_NAME: 'production' | 'development';
  readonly VITE_APP_TITLE: string;
  readonly VITE_BASE_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
