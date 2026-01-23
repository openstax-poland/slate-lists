// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { BaseEditor, Editor, Node } from 'slate'

import normalizeNode from './normalize'

export * as Transforms from './transforms'
export { onKeyDown } from './handlers'
export { BaseList, BaseListItem, List, ListItem, CustomTypes, ExtendedType } from './interfaces'

/** A slate editor augmented with support for lists. */
export interface ListEditor extends BaseEditor {
    /**
     * Check if a node special-purpose list item
     *
     * The plugin will allow these nodes in lists in addition to list items and
     * nested lists. You should be very careful what you allow here, as this is
     * not tested.
     */
    isSpecialListItem: (node: Node) => boolean
}

/** Augment an editor with list related functionality and behaviours. */
export function withLists<T extends BaseEditor>(editor: T): T & ListEditor {
    const e = editor as T & ListEditor
    const { normalizeNode: oldNormalizeNode } = e

    e.isSpecialListItem = () => false
    e.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, e)

    return e
}
