module.exports = {
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    // parser: '@typescript-eslint/parser',
    // sourceType: 'module',
    // allowImportExportEverywhere: true,
    // ecmaFeatures: {
    //   jsx: true,
    // },
    parser: 'babel-eslint',
    ecmaVersion: 2016,
    sourceType: 'module',
  },
  rules: {
  },
  globals: {
    app: true,
    Swiper: true,
    need: true,
    $: true,
  },
  env: {
    jest: true,
  },
};
