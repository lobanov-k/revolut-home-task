/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleDirectories: [
        "node_modules",
        "src"
    ],
    setupFilesAfterEnv: [
        "<rootDir>/tests/setup-tests.ts"
    ],
    transform: {
        "^.+\\.svg$": "<rootDir>/tests/svgTransform.js" 
    },
};
