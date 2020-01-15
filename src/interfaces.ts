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

/** Interface to which list items conform.
 *
 * You are free to add other properties to list items.
 */
export interface ListItem extends Element {
    type: 'list_item',
}

/**
 * Check if a value implements the [[List]] interface.
 */
export function isList(value: any): value is List {
    return Element.isElement(value) && value.type === 'list'
}

/**
 * Check if a value implements the [[ListItem]] interface.
 */
export function isListItem(value: any): value is ListItem {
    return Element.isElement(value) && value.type === 'list_item'
}

