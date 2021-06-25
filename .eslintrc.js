module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/vue',
        '@ecomfe/eslint-config/typescript',
    ],
    rules: {
        'no-unused-vars': 'off',
        'no-console': 'warn',
    }
};
