/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ["lcov", "html"],
  collectCoverageFrom: ["./src/**"],
  coverageDirectory: "coverage"
};