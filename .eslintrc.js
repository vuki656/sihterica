module.exports = {
    extends: [
        require.resolve('@rimac-technology/style-guide/eslint/core'),
        require.resolve('@rimac-technology/style-guide/eslint/react'),
        require.resolve('@rimac-technology/style-guide/eslint/next'),
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: []
}
