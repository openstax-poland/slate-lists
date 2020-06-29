// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor } from 'slate'

import normalizeNode from './normalize'
import { decreaseDepth, increaseDepth } from './transforms'

export { List, ListItem } from './interfaces'

/** A slate editor augmented with support for lists. */
/* eslint-disable-next-line @typescript-eslint/no-empty-interface */
export interface ListEditor extends Editor {
}

/** Augment an editor with list related functionality and behaviours. */
export function withLists<T extends Editor>(editor: T): T & ListEditor {
    const { normalizeNode: oldNormalizeNode } = editor

    editor.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, editor)

    return editor
}

export const Transforms = {
    decreaseDepth,
    increaseDepth,
}
