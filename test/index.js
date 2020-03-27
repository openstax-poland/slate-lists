import chai from 'chai'
import { withLists } from '..'
import { Editor } from 'slate'
import { createHyperscript } from 'slate-hyperscript'

import fixtures from './util/fixtures'

global.expect = chai.expect
global.should = chai.should()

fixtures(__dirname, 'normalization', ({ input, output }) => {
    const editor = withLists(input)
    Editor.normalize(input, { force: true })
    expect(editor.children).to.deep.eq(output.children)
    expect(editor.selection).to.deep.eq(output.selection)
})

fixtures(__dirname, 'transforms', ({ input, output, run }) => {
    const editor = withLists(input)
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
