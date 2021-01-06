module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  modulePathIgnorePatterns: [
    "dist",
    "build",
  ],
  preset: 'ts-jest',
  setupFilesAfterEnv: [
    "./config/setuptests.ts"
  ],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testMatch: ["**/*.test.+(ts|tsx)"],
  transform: {
      "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json"
    }
  }
};
