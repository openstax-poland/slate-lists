import { defineConfig } from 'eslint/config'
import base from 'eslint-config-openstax-poland/base'

export default defineConfig([base, {
    rules: {
        // Same as default configuration but PascalCase is allowed for variable
        // names. This is because we follow Slate's convention of defining
        // functions connected to interfaces as an object with the same name
        // (using declaration merging):
        //
        // interface Name {}
        //
        // const Name = {
        //     isName(value: unknown): value is Name {
        //         // ...
        //     },
        // }
        '@typescript-eslint/naming-convention': [
            'warn',
            {
                selector: 'default',
                format: ['camelCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'variable',
                format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
                leadingUnderscore: 'allow',
                trailingUnderscore: 'allow',
            },
            {
                selector: 'typeLike',
                format: ['PascalCase'],
            },
        ],
    },
}])
