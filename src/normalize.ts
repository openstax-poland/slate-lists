// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.

import { Editor, Node, NodeEntry, Text, Transforms } from 'slate'

import { List, ListItem } from './interfaces'

export default function normalizeNode(
    normalizeNode: (entry: NodeEntry) => void,
    editor: Editor,
    entry: NodeEntry,
) {
    const [node, path] = entry

    if (List.isList(node)) {
        // Remove empty lists
        if (node.children.length === 1
        && Text.isText(node.children[0])
        && node.children[0].text === '') {
            Transforms.removeNodes(editor, { at: path })
            return
        }

        // A list should only contain lists and list_items. Wrap any other nodes
        // in a list_item.
        for (const [child, childPath] of Node.children(editor, path)) {
            if (!ListItem.isListItem(child) && !List.isList(child)) {
                Transforms.wrapNodes(
                    editor,
                    { type: 'list_item', children: [] },
                    { at: childPath },
                )
                return
            }
        }

        // To avoid arbitrary nesting, each nested list must be preceded by at
        // least one item. Unwrap all nested lists which aren't.
        const [parent] = Editor.parent(editor, path)
        if (List.isList(parent) && Editor.previous(editor, { at: path }) == null) {
            Transforms.unwrapNodes(editor, { at: path })
            return
        }

        // There should be no adjacent lists. If there are any merge then into
        // one.
        // TODO: allow for different kinds of lists (e.g. enumerated and
        // itemized) not to be joined.
        const [next, nextPath] = Editor.next(editor, { at: path }) || []
        if (next != null && List.isList(next)) {
            Transforms.mergeNodes(editor, { at: nextPath })
            return
        }
    }

    if (ListItem.isListItem(node)) {
        // List items should only ever exist as children of a list. Replace all
        // other list items with their contents.
        const [parent] = Editor.parent(editor, path)
        if (!List.isList(parent)) {
            Transforms.unwrapNodes(editor, { at: path })
            return
        }
    }

    // Fall back to original normalizeNode.
    normalizeNode(entry)
}
