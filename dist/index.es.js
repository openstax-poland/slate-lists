import { Element, Editor, Transforms as Transforms$1, Node, Text, Range } from 'slate';

// Copyright 2020 OpenStax Poland
const List = {
    /**
     * Check if a value implements the [[List]] interface.
     */
    isList(value) {
        return Element.isElement(value) && value.type === 'list';
    },
};
const ListItem = {
    /**
     * Check if a value implements the [[ListItem]] interface.
     */
    isListItem(value) {
        return Element.isElement(value) && value.type === 'list_item';
    },
};

// Copyright 2020 OpenStax Poland
function normalizeNode(normalizeNode, editor, entry) {
    var _a, _b;
    const [node, path] = entry;
    if (List.isList(node)) {
        // Remove empty lists.
        if (Editor.isEmpty(editor, node)) {
            Transforms$1.removeNodes(editor, { at: path });
            return;
        }
        // A list should only contain lists and list_items. Wrap any other nodes
        // in a list_item.
        for (const [child, childPath] of Node.children(editor, path)) {
            if (!ListItem.isListItem(child) && !List.isList(child)) {
                Transforms$1.wrapNodes(editor, { type: 'list_item', children: [] }, { at: childPath });
                return;
            }
        }
        // To avoid arbitrary nesting, each nested list must be preceded by at
        // least one item. Unwrap all nested lists which aren't.
        const [parent] = Editor.parent(editor, path);
        const [prev] = (_a = Editor.previous(editor, { at: path })) !== null && _a !== void 0 ? _a : [];
        if (List.isList(parent) && prev == null) {
            Transforms$1.unwrapNodes(editor, { at: path });
            return;
        }
        // There should be no adjacent lists. If there are any merge then into
        // one.
        // TODO: allow for different kinds of lists (e.g. enumerated and
        // itemized) not to be joined.
        const [next, nextPath] = (_b = Editor.next(editor, { at: path })) !== null && _b !== void 0 ? _b : [];
        if (next != null && List.isList(next)) {
            Transforms$1.mergeNodes(editor, { at: nextPath });
            return;
        }
        if (prev != null && List.isList(prev)) {
            Transforms$1.mergeNodes(editor, { at: path });
            return;
        }
    }
    if (ListItem.isListItem(node)) {
        // Remove empty items.
        if (Editor.isEmpty(editor, node)) {
            Transforms$1.removeNodes(editor, { at: path });
            return;
        }
        // List items should only ever exist as children of a list. Replace all
        // other list items with their contents.
        const [parent] = Editor.parent(editor, path);
        if (!List.isList(parent)) {
            Transforms$1.unwrapNodes(editor, { at: path });
            return;
        }
    }
    // Fall back to original normalizeNode.
    normalizeNode(entry);
}

// Copyright 2020 OpenStax Poland
/** Decrease depth of items in selection */
function decreaseDepth(editor, options = {}) {
    const { at = editor.selection } = options;
    if (at == null)
        return;
    Transforms$1.liftNodes(editor, {
        at,
        match: ListItem.isListItem,
        mode: 'lowest',
    });
}
/** Increase depth of items in selection */
function increaseDepth(editor, options = {}) {
    Editor.withoutNormalizing(editor, () => {
        var _a, _b;
        const { at = editor.selection } = options;
        if (at == null)
            return;
        const [[, parentPath]] = Editor.levels(editor, {
            at,
            match: n => isComplexBlock(editor, n) && !ListItem.isListItem(n),
            reverse: true,
        });
        const spans = Array.from(spansToWrapInList(editor, parentPath, Editor.range(editor, at)), ([start, end]) => [
            Editor.pathRef(editor, start),
            Editor.pathRef(editor, end, { affinity: 'backward' }),
        ]);
        for (const [startRef, endRef] of spans) {
            const start = startRef.unref();
            const end = endRef.unref();
            const range = Editor.range(editor, start, end);
            const [parent] = Editor.parent(editor, start);
            const match = (n) => parent.children.includes(n);
            const [prev, prevPath] = (_a = Editor.previous(editor, { at: start })) !== null && _a !== void 0 ? _a : [];
            if (List.isList(prev)) {
                Transforms$1.moveNodes(editor, {
                    at: range,
                    to: prevPath.concat(prev.children.length),
                    match,
                });
                continue;
            }
            const [next, nextPath] = (_b = Editor.next(editor, { at: end })) !== null && _b !== void 0 ? _b : [];
            if (List.isList(next)) {
                Transforms$1.moveNodes(editor, {
                    at: range,
                    to: nextPath.concat(0),
                    match,
                });
                continue;
            }
            Transforms$1.wrapNodes(editor, {
                type: 'list',
                children: [],
            }, { at: range, match });
        }
    });
}
/**
 * Check if a node is a non-inline element which contains other non-inline
 * elements
 */
function isComplexBlock(editor, node) {
    return (Editor.isEditor(node) || Element.isElement(node))
        && !Text.isText(node.children[0])
        && !Editor.isInline(editor, node.children[0]);
}
/**
 * Yield a sequence of spans which need to be wrapped in lists to increase depth
 * of selection
 */
function* spansToWrapInList(editor, parentPath, range) {
    let start = null;
    let end = null;
    for (const [child, childPath] of Node.children(editor, parentPath)) {
        if (!Range.includes(range, childPath))
            continue;
        if (List.isList(child)) {
            if (start != null) {
                yield [start, end];
            }
            yield* spansToWrapInList(editor, childPath, range);
            start = end = null;
            continue;
        }
        if (start == null) {
            start = childPath;
        }
        end = childPath;
    }
    if (start != null) {
        yield [start, end];
    }
}

// Copyright 2021 OpenStax Poland
/**
 * Handle a keydown event
 *
 * If the event is handled this function will call preventDefault on it.
 */
function onKeyDown(editor, ev) {
    switch (ev.key) {
        case 'Enter': return onEnter(editor, ev);
    }
}
/** Handle enter/paragraph break */
function onEnter(editor, ev) {
    const { selection } = editor;
    if (selection == null) {
        return;
    }
    // Shift disables special handling
    if (ev.shiftKey) {
        return;
    }
    if (!editor.selection)
        return;
    // splits node; if there was no text in a node, exits the list
    if (Editor.above(editor, { match: n => List.isList(n) })) {
        const node = Editor.node(editor, editor.selection);
        Transforms$1.splitNodes(editor, { match: ListItem.isListItem, always: true });
        if (node[0].text === '' || node[0].text === '/n' || node[0].text === '/n/n') {
            decreaseDepth(editor);
            Transforms$1.removeNodes(editor, { match: ListItem.isListItem, at: { path: node[1], offset: 0 } });
        }
        return ev.preventDefault();
    }
}

// Copyright 2020 OpenStax Poland
/** Augment an editor with list related functionality and behaviours. */
function withLists(editor) {
    const { normalizeNode: oldNormalizeNode } = editor;
    editor.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, editor);
    return editor;
}
const Transforms = {
    decreaseDepth,
    increaseDepth,
};

export { List, ListItem, Transforms, onKeyDown, withLists };
//# sourceMappingURL=index.es.js.map
