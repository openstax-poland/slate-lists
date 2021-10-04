// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Element } from 'slate';
export const List = {
    /**
     * Check if a value implements the [[List]] interface.
     */
    isList(value) {
        return Element.isElement(value) && value.type === 'list';
    },
};
export const ListItem = {
    /**
     * Check if a value implements the [[ListItem]] interface.
     */
    isListItem(value) {
        return Element.isElement(value) && value.type === 'list_item';
    },
};
