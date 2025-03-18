module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'jest', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules', 'coverage'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true 
    }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        'selector': 'interface',
        'format': ['PascalCase'],
        'custom': {
          'regex': '^I[A-Z]',
          'match': false
        }
      },
      {
        'selector': 'typeAlias',
        'format': ['PascalCase']
      },
      {
        'selector': 'enum',
        'format': ['PascalCase']
      },
      {
        'selector': 'class',
        'format': ['PascalCase']
      }
    ],
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'trailingComma': 'all',
      'printWidth': 100,
      'semi': true,
      'bracketSpacing': true,
      'arrowParens': 'avoid'
    }],
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index']
        ],
        'newlines-between': 'always',
        'alphabetize': {
          'order': 'asc',
          'caseInsensitive': true
        }
      }
    ],
    // Rules specific to CAR framework philosophical approach
    'max-depth': ['warn', 4], // Encourages proper abstraction levels reflecting CAR layers
    'complexity': ['warn', 15], // Encourages reasoning that can be explained and critiqued
    'max-lines-per-function': ['warn', 200], // Encourages manageable reasoning units
    'max-params': ['warn', 5], // Encourages well-defined function interfaces
    'no-console': 'warn', // Should use structured logging in production
    'no-param-reassign': 'error', // Promotes immutability for clearer reasoning
    'prefer-const': 'error', // Promotes immutability
    'no-var': 'error', // Promotes modern JavaScript practices
    'eqeqeq': ['error', 'always'], // Prevents type coercion bugs
    'curly': ['error', 'all'], // Enforces blocks for readability
    'no-eval': 'error', // Prevents injection risks
    'no-implied-eval': 'error', // Prevents indirect eval risks
    'no-return-await': 'error', // Prevents unnecessary promise wrapping
    'require-await': 'error', // Ensures async functions use await
  },
  settings: {
    'import/resolver': {
      'typescript': {
        'alwaysTryTypes': true,
        'project': './tsconfig.json',
      }
    }
  }
};
