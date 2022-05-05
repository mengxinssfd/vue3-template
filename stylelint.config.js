// pnpm add stylelint stylelint-config-standard stylelint-config-html stylelint-config-standard-scss stylelint-config-recommended-vue stylelint-config-prettier stylelint-order stylelint-config-prettier postcss-html -D

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-html/vue',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  rules: {
    //    'selector-class-pattern': [
    //      // 命名规范,兼容vant
    //      '^([a-z][a-z0-9]*)([_|-]+[a-z0-9]+)*$',
    //      {
    //        message: '命名规范不符合',
    //      },
    //    ],
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          // 忽略tailwindcss的属性
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
        ],
      },
    ],
    'at-rule-empty-line-before': null,
    'no-descending-specificity': null,

    'function-url-quotes': 'always',
    'string-quotes': 'double',
    indentation: 2,
    'unit-case': null,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'rule-empty-line-before': 'never',
    'font-family-no-missing-generic-family-keyword': null,
    'block-opening-brace-space-before': 'always',
    'property-no-unknown': null,
    'no-empty-source': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'justify-content',
      'align-items',
      'float',
      'clear',
      'overflow',
      'overflow-x',
      'overflow-y',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'font-size',
      'font-family',
      'font-weight',
      'border',
      'border-style',
      'border-width',
      'border-color',
      'border-top',
      'border-top-style',
      'border-top-width',
      'border-top-color',
      'border-right',
      'border-right-style',
      'border-right-width',
      'border-right-color',
      'border-bottom',
      'border-bottom-style',
      'border-bottom-width',
      'border-bottom-color',
      'border-left',
      'border-left-style',
      'border-left-width',
      'border-left-color',
      'border-radius',
      'text-align',
      'text-justify',
      'text-indent',
      'text-overflow',
      'text-decoration',
      'white-space',
      'color',
      'background',
      'background-position',
      'background-repeat',
      'background-size',
      'background-color',
      'background-clip',
      'opacity',
      'filter',
      'list-style',
      'outline',
      'visibility',
      'box-shadow',
      'text-shadow',
      'resize',
      'transition',
    ],
  },
};
