// 参考文档：https://cn.vitejs.dev/guide/env-and-mode.html

// import.meta.env.VITE_APP_TITLE 使用时的ts类型提示
declare global {
  interface ImportMetaEnv {
    readonly VITE_MODE_NAME: 'production' | 'development';
    // html title
    readonly VITE_APP_TITLE: string;
    // axios的base url
    readonly VITE_BASE_URL: string;
    // html lang
    readonly VITE_APP_LANG: string;
    // vite config的base
    readonly VITE_BASE_PATH: string;
    // 移除console.log
    readonly VITE_BUILD_DROP_CONSOLE: 'true' | void;
    // 移除debugger
    readonly VITE_BUILD_DROP_DEBUGGER: 'true' | void;
    // sourcemap
    readonly VITE_SOURCEMAP: 'true' | void;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
export {};
