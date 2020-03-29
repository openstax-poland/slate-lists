// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Element } from 'slate'

/** Interface to which list elements conform.
 *
 * You are free to add other properties to your lists.
 */
export interface List extends Element {
    type: 'list',
}

export const List = {
    /**
     * Check if a value implements the [[List]] interface.
     */
    isList(value: unknown): value is List {
        return Element.isElement(value) && value.type === 'list'
    },
}

/** Interface to which list items conform.
 *
 * You are free to add other properties to list items.
 */
export interface ListItem extends Element {
    type: 'list_item',
}

export const ListItem = {
    /**
     * Check if a value implements the [[ListItem]] interface.
     */
    isListItem(value: unknown): value is ListItem {
        return Element.isElement(value) && value.type === 'list_item'
    },
}
