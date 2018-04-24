module.exports = {
    extends: ['airbnb'],
    rules: {
      'max-len': [2, 100],
      'no-restricted-syntax': 0,
      'no-continue': 0,
      'react/jsx-filename-extension': 0,
      'space-before-function-paren': [2, { anonymous: 'never', named: 'never' }],
      'generator-star-spacing': 0,
      'arrow-parens': 0,
      'arrow-body-style': 0,
      'wrap-iife': 0,
      'no-mixed-operators': 0,
    },
    globals: {
      document: true,
      localStorage: true,
    },
  };