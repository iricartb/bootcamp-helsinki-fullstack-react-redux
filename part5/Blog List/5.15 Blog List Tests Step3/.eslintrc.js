/* eslint-disable no-undef */
module.exports = {
   'env': {
      'browser': true,
      'es6': true,
      'jest/globals': true
   },
   'extends': [
      'eslint:recommended',
      'plugin:react/recommended'
   ],
   'parserOptions': {
      'ecmaFeatures': {
         'jsx': true
      },
      'ecmaVersion': 2018,
      'sourceType': 'module'
   },
   'plugins': [
      'react', 'jest'
   ],
   'rules': {
      'indent': [
         'error',
         3
      ],
      'quotes': [
         'error',
         'single'
      ],
      'semi': [
         'error',
         'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'arrow-spacing': [
         'error', { 'before': true, 'after': true }
      ],
      'no-console': 0,
      'react/prop-types': 0
   },
   'settings': {
      'react': {
         'version': 'detect'
      }
   }
}