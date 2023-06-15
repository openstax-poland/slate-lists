// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Node } from 'slate'

import normalizeNode from './normalize'
import { decreaseDepth, increaseDepth } from './transforms'

export { onKeyDown } from './handlers'
export { List, ListItem } from './interfaces'

/** A slate editor augmented with support for lists. */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface ListEditor extends Editor {
}

/** Options for the lists plugin */
export interface ListEditorOptions {
    /**
     * Check if a node special-purpose list item
     *
     * The plugin will allow these nodes in lists in addition to list items and
     * nested lists. You should be very careful what you allow here, as this is
     * not tested.
     */
    isSpecialListItem: (node: Node) => boolean
}

const DEFAULT_OPTIONS: ListEditorOptions = {
    isSpecialListItem: () => false,
}

/** Augment an editor with list related functionality and behaviours. */
export function withLists<T extends Editor>(editor: T): T & ListEditor
export function withLists<T extends Editor>(
    options: Partial<ListEditorOptions>, editor: T): T & ListEditor

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function withLists<T extends Editor>(...args: any[]): T & ListEditor {
    const editor: T = args.length === 2 ? args[1] : args[0]
    const userOptions: Partial<ListEditorOptions> = args.length === 2 ? args[0] : {}
    const options = { ...DEFAULT_OPTIONS, ...userOptions }

    const { normalizeNode: oldNormalizeNode } = editor

    editor.normalizeNode = normalizeNode.bind(null, options, oldNormalizeNode, editor)

    return editor
}

export const Transforms = {
    decreaseDepth,
    increaseDepth,
}
