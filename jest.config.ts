/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    roots: ["./"],
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    testPathIgnorePatterns: ["/lib/", "/node_modules/", "/dist/"],
    coverageDirectory: "./coverage",
    coveragePathIgnorePatterns: ["/lib/", "/node_modules/", "/dist/", "index.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: false
}
