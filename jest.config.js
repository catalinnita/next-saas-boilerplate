module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  modulePathIgnorePatterns: [
    "dist",
    "build",
    // ".next",
  ],
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    "./config/setuptests.ts"
  ],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testMatch: ["**/*.test.+(ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  }
};
