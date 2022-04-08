// 参考文档：https://cn.vitejs.dev/guide/env-and-mode.html

// import.meta.env.VITE_APP_TITLE 使用时的ts类型提示
declare global {
  interface ImportMetaEnv {
    readonly VITE_MODE_NAME: 'production' | 'development';
    readonly VITE_APP_TITLE: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_APP_LANG: string;
    readonly VITE_BASE_PATH: string;
    readonly VITE_BUILD_SOURCEMAP: boolean;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
export {};
