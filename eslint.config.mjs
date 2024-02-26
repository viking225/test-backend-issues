import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';

export default tseslint.config(
{
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
    ],
    rules: {
        semi: [2, 'always']
    },
}
);
