module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.interface.ts',
    '!src/**/*.types.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
    './src/core/': {
      branches: 90,
      functions: 95,
      lines: 95,
      statements: 95,
    },
    './src/domains/healthcare/': {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './src/domains/education/': {
      branches: 85, 
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './src/domains/governance/': {
      branches: 85,
      functions: 90,
      lines: 90,
      statements: 90,
    }
  },
  verbose: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: false,
    },
  },
  // Custom reporters for philosophical approach
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './reports/junit',
      outputName: 'jest-junit.xml',
    }],
    ['./tests/reporters/epistemic-reporter.js', {
      // Custom reporter to analyze epistemic quality of tests
      confidenceThreshold: 0.8,
      boundaryDetection: true,
    }],
  ],
  // Custom environment variables for testing
  testEnvironmentOptions: {
    CAR_TEST_MODE: 'true',
    CAR_EPISTEMIC_VALIDATION: 'true', 
    CAR_CATEGORICAL_IMPERATIVE_TESTING: 'true',
  },
  // Timeout increased for complex reasoning tests
  testTimeout: 30000,
};
