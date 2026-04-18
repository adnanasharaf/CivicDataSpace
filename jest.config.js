/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|scss|svg|png|jpg)$": "identity-obj-proxy",
  },
  testMatch: ["<rootDir>/src/__tests__/**/*.test.(ts|tsx)"],
};

module.exports = config;
