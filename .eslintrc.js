module.exports = {
  /* 指定如何解析语法。*/
  parser: 'vue-eslint-parser',
  /* 优先级低于parse的语法解析配置 */
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则
    'prettier',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 禁止使用 var
    'no-var': 'error',
    // 优先使用 interface 而不是 type
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/no-explicit-any': "off",
    '@typescript-eslint/explicit-module-boundary-types': "off",
    '@typescript-eslint/ban-types': "off",
    '@typescript-eslint/no-unused-vars': "error",
    // 下面两个规则可以去 参照4 规则看详细介绍
    'vue/html-indent': ['error', 2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 10,
        },
        multiline: {
          max: 1,
        }
      }
    ],
  },
};
