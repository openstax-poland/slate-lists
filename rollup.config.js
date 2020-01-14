import typescript from "@wessberg/rollup-plugin-ts"

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.es.js',
            format: 'es',
            sourcemap: true,
        },
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
    ],
    plugins: [
        typescript(),
    ],
    external: [
        'slate',
    ],
}
