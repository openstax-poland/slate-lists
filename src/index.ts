// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor } from 'slate'

import { List, ListItem, isList, isListItem } from './interfaces'

/** A slate editor augmented with support for lists. */
export interface ListEditor extends Editor {
}

/** Augment an editor with list related functionality and behaviours. */
export function withLists<T extends Editor>(editor: T): T & ListEditor {
    return editor
}

const List = {
    isList,
    isListItem,
}

export { List, ListItem }
