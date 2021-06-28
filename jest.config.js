module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js"],
  modulePathIgnorePatterns: [
    "dist",
    "build",
    "__tests1__",
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
  },
  collectCoverageFrom: [
    "<rootDir>/components/*.+(ts|tsx)",
    "<rootDir>/utils/*.+(ts|tsx)",
    "<rootDir>/pages/*.+(ts|tsx)",
    "!<rootDir>/state/",
    "!<rootDir>/utils/useStateSelector.ts", // too complicated to offer 100% coverage
    "!<rootDir>/utils/auth0.ts", // no valuable tests
    "!<rootDir>/pages/_app.tsx", // have no idea how to test this
  ]
};
