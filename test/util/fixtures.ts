import { type Editor } from 'slate'
import { describe, test } from 'vitest'
import fs from 'fs'
import { basename, extname, resolve } from 'path'

import { ListEditor } from '../../src'

type TestFunction<D> = (module: {
    default: D,
    input: Editor,
    output: Editor,
    withEditor?: (editor: ListEditor) => ListEditor,
}) => void

export default function fixtures<D = void>(path: string, test: TestFunction<D>): void
export default function fixtures<D = void>(path0: string, path1: string, test: TestFunction<D>): void

export default function fixtures<D = void>(...args: any[]) {
    const fn = args.pop()

    const path = resolve(...args)
    const files = fs.readdirSync(path)
    const name = basename(path)

    describe(name, () => {
        for (const file of files) {
            const p = resolve(path, file)
            const stat = fs.statSync(p)

            if (stat.isDirectory()) {
                fixtures(path, file, fn)
                continue
            }

            const name = basename(file, extname(file))

            // This needs to be a non-arrow function to use `this.skip()`.
            test(name, async ({ skip }) => {
                const module = await import(p)

                if (module.skip) {
                    skip(module.skip)
                    return
                }

                fn(module)
            })
        }
    })
}
