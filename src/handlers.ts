// Copyright 2021 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Descendant, Editor, Node, Path, Point, Range, Text, Transforms } from 'slate'

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

    const [list, listPath] = Editor.above(editor, { match: List.isList }) ?? []
    if (list == null) return

    const [item, itemPath] = Editor.above(editor, { match: ListItem.isListItem }) ?? []
    if (item == null) return

    // If there is no text in a node, exits the list ...
    if (isItemEmpty(item)) {
        decreaseDepth(editor)
        return ev.preventDefault()
    }

    // ..., otherwise split the node

    if (Range.isCollapsed(editor.selection)) {
        const isFirst = isFirstInItem(listPath!, editor.selection.anchor)
        const isLast = isLastInItem(editor, listPath!, editor.selection.anchor)

        // When the cursor is at the beginning or the end of a list item,
        // splitting the item would ultimately produce the correct result, but
        // the operations it performs are problematic when e.g. tracking
        // changes. Instead we just insert a new item.
        if (isFirst || isLast) {
            const newPath = isFirst ? itemPath : Path.next(itemPath!)
            const node = item.children[isFirst ? 0 : item.children.length - 1]

            Transforms.insertNodes(
                editor,
                {
                    type: 'list_item',
                    children: [{
                        ...node,
                        children: [{ text: '' }] as Node[],
                    }],
                } as ListItem,
                {
                    at: newPath,
                    select: isLast,
                },
            )

            return ev.preventDefault()
        }
    }

    // In all other cases we can split the item normally.
    Transforms.splitNodes(editor, { match: ListItem.isListItem, always: true })
    return ev.preventDefault()
}

/**
 * Check if a {@link ListItem} is empty
 *
 * A list item is considered empty when it contains at most one {@link Element}
 * which contains at most one {@link Text}, which contains only white space
 * characters.
 */
function isItemEmpty(item: ListItem): boolean {
    if (item.children.length === 0) return true
    if (item.children.length > 1) return false

    let node: Descendant = item.children[0]

    if (!Text.isText(node)) {
        if (node.children.length === 0) return true
        if (node.children.length > 1) return false
        node = node.children[0]
        if (!Text.isText(node)) return false
    }

    return node.text.trim() === ''
}

function isFirstInItem(listPath: Path, point: Point): boolean {
    const { path, offset } = point
    return path.length === listPath.length + 3 // [...listPath, item, container, text]
        && offset === 0
        && path[path.length - 1] === 0 // first in container
        && path[path.length - 2] === 0 // first in item
}

function isLastInItem(editor: Editor, listPath: Path, point: Point): boolean {
    const { path, offset } = point

    // [...listPath, item, container, text]
    if (path.length !== listPath.length + 3) return false

    const parent = Node.parent(editor, path)
    const node = parent.children[path[path.length - 1]]
    const item = Node.parent(editor, Path.parent(path))

    return path[path.length - 1] === parent.children.length - 1 // last in container
        && path[path.length - 2] === item.children.length - 1 // last in item
        && Text.isText(node)
        && offset === node.text.length
}
