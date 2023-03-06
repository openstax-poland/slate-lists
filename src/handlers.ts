// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, NodeEntry, Transforms } from 'slate'

import { List, ListItem } from './interfaces'
import { decreaseDepth } from './transforms'

/**
 * Handle a keydown event
 *
 * If the event is handled this function will call preventDefault on it.
 */
export function onKeyDown(editor: Editor, ev: KeyboardEvent): void {
    switch (ev.key) {
    case 'Enter': return onEnter(editor, ev)
    default:
    }
}

/** Handle enter/paragraph break */
function onEnter(editor: Editor, ev: KeyboardEvent): void {
    const { selection } = editor

    if (selection == null) {
        return
    }

    // Shift disables special handling
    if (ev.shiftKey) {
        return
    }

    if (!editor.selection) return

    // splits node; if there was no text in a node, exits the list
    if (Editor.above(editor, { match: n => List.isList(n) })) {
        const node: NodeEntry<any> = Editor.node(editor, editor.selection)
        Transforms.splitNodes(editor, { match: ListItem.isListItem, always: true })
        if (node[0].text === '' || node[0].text ==='/n' || node[0].text === '/n/n') {
            decreaseDepth(editor)
            Transforms.removeNodes(editor,
                { match: ListItem.isListItem, at: { path: node[1], offset: 0 } })
        }
        return ev.preventDefault()
    }
}
