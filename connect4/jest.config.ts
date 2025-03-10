import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  collectCoverage: true,
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
