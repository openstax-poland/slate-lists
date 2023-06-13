import chai from 'chai'
import { withLists } from '../src'
import { Editor } from 'slate'
import { createHyperscript } from 'slate-hyperscript'

import fixtures from './util/fixtures'
import withInput from './util/input'

global.expect = chai.expect
global.should = chai.should()

fixtures(__dirname, 'handlers', ({ input, output, default: act }) => {
    const editor = withTest(input)
    const simulator = withInput(editor)
    act(simulator, editor)
    expect(editor.children).to.deep.eq(output.children)
    expect(editor.selection).to.deep.eq(output.selection)
})

fixtures(__dirname, 'normalization', ({ input, output }) => {
    const editor = withTest(input)
    Editor.normalize(editor, { force: true })
    expect(editor.children).to.deep.eq(output.children)
    expect(editor.selection).to.deep.eq(output.selection)
})

fixtures(__dirname, 'transforms', ({ input, output, run }) => {
    const editor = withTest(input)
    run(editor)
    expect(editor.children).to.deep.eq(output.children)
    expect(editor.selection).to.deep.eq(output.selection)
})

global.h = createHyperscript({
    elements: {
        block: {},
        list: { type: 'list' },
        li: { type: 'list_item' },
    },
})

function withTest(input) {
    const editor = createEditor()

    editor.children = input.children
    editor.selection = input.selection

    return withLists(editor)
}
