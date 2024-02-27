import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default tseslint.config({
    ignores: ['jest.config.js'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
        semi: [2, 'always'],
        'prettier/prettier': 2,
    },
    plugins: ['@typescript-eslint', 'prettier'],
});
