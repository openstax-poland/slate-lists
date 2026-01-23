// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Element } from 'slate'

type ExtendableTypes =
    | 'List'
    | 'ListItem'

export interface CustomTypes {
    [key: string]: unknown
}

export type ExtendedType<K extends ExtendableTypes, B> = unknown extends CustomTypes[K]
    ? B
    : CustomTypes[K]

/**
 * Interface to which list elements conform.
 *
 * You are free to add other properties to your lists.
 */
export interface BaseList {
    type: 'list'
    children: Descendant[]
}

export type List = ExtendedType<'List', BaseList>

export const List = {
    /**
     * Check if a value implements the [[List]] interface.
     */
    isList(this: void, value: unknown): value is List {
        return Element.isElement(value) && value.type === 'list'
    },
}

/**
 * Interface to which list items conform.
 *
 * You are free to add other properties to list items.
 */
export interface BaseListItem {
    type: 'list_item'
    children: Element[]
}

export type ListItem = ExtendedType<'ListItem', BaseListItem>

export const ListItem = {
    /**
     * Check if a value implements the [[ListItem]] interface.
     */
    isListItem(this: void, value: unknown): value is ListItem {
        return Element.isElement(value) && value.type === 'list_item'
    },
}
