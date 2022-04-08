import { UserConfig } from 'vite';
import production from './production';
import development from './development';
import externalGlobals from 'rollup-plugin-external-globals';
import { JsDependence } from './interface';

function handleCss(cssUrlList: string[]) {
  return cssUrlList.reduce(
    (init, v) => `${init}<link rel="stylesheet" type="text/css" href="${v}"/>\n`,
    '',
  );
}
function handleJs(jsDepends: JsDependence[]) {
  return jsDepends.reduce(
    (init, { url }) => `${init}<script type="text/javascript" src="${url}"></script>\n`,
    '',
  );
}
function handleGlobal(jsDepends: JsDependence[]) {
  return jsDepends.reduce((prev, cur) => {
    prev[cur.name] = cur.var;
    return prev;
  }, {} as Record<string, string>);
}

export function cdnHooks(env: ImportMetaEnv) {
  const dependencies = { development, production };
  const depend = dependencies[env.VITE_MODE_NAME];
  const css = handleCss(depend.css);
  const script = handleJs(depend.js);
  // rollup的global配置
  const global = handleGlobal(depend.js);
  return {
    getCdnInjectData() {
      return { injectScript: script, injectCss: css };
    },
    handleProductionCdn(config: UserConfig) {
      if (env.VITE_MODE_NAME === 'production') {
        config.build.rollupOptions.plugins.push(externalGlobals(global));
      }
    },
  };
}
