// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Transforms } from 'slate'

import { List, ListItem } from './interfaces'

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

    if (Editor.above(editor, { match: n => List.isList(n) })) {
        Transforms.splitNodes(editor, { match: ListItem.isListItem, always: true })
        return ev.preventDefault()
    }
}
