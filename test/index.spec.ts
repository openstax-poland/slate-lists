import { expect } from 'vitest'
import { withLists, ListEditor } from '../src'
import { Editor, createEditor } from 'slate'
import { createHyperscript } from 'slate-hyperscript'

import fixtures from './util/fixtures'
import simulateInput, { Simulator } from './util/input'

// Force vitest to watch fixtures
import.meta.glob('./handlers/**/*.tsx')
import.meta.glob('./normalization/**/*.tsx')
import.meta.glob('./transforms/**/*.tsx')

fixtures<(input: Simulator, editor: Editor) => void>(__dirname, 'handlers', ({ input, output, default: act }) => {
    const editor = withTest(input)
    const simulator = simulateInput(editor)
    act(simulator, editor)
    expect(editor.children).to.deep.eq(output.children)
    expect(editor.selection).to.deep.eq(output.selection)
})

fixtures(__dirname, 'normalization', ({ input, output, withEditor }) => {
    const editor = withTest(input, withEditor)
    Editor.normalize(editor, { force: true })
    expect(editor.children).to.deep.eq(output.children)
    expect(editor.selection).to.deep.eq(output.selection)
})

fixtures<(editor: Editor) => void>(__dirname, 'transforms', ({ input, output, default: act }) => {
    const editor = withTest(input)
    act(editor)
    expect(editor.children).to.deep.eq(output.children)
    expect(editor.selection).to.deep.eq(output.selection)
})

globalThis.h = createHyperscript({
    elements: {
        block: {},
        list: { type: 'list' },
        li: { type: 'list_item' },
    },
})

function withTest(input: Editor, withEditor?: (editor: ListEditor) => ListEditor) {
    let editor = withLists(createEditor())

    if (withEditor != null) {
        editor = withEditor(editor)
    }

    editor.children = input.children
    editor.selection = input.selection

    return editor
}
