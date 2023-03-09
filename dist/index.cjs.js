'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var slate = require('slate');

// Copyright 2020 OpenStax Poland
const List = {
    /**
     * Check if a value implements the [[List]] interface.
     */
    isList(value) {
        return slate.Element.isElement(value) && value.type === 'list';
    },
};
const ListItem = {
    /**
     * Check if a value implements the [[ListItem]] interface.
     */
    isListItem(value) {
        return slate.Element.isElement(value) && value.type === 'list_item';
    },
};

// Copyright 2020 OpenStax Poland
function normalizeNode(normalizeNode, editor, entry) {
    var _a, _b;
    const [node, path] = entry;
    if (List.isList(node)) {
        // Remove empty lists.
        if (slate.Editor.isEmpty(editor, node)) {
            slate.Transforms.removeNodes(editor, { at: path });
            return;
        }
        // A list should only contain lists and list_items. Wrap any other nodes
        // in a list_item.
        for (const [child, childPath] of slate.Node.children(editor, path)) {
            if (!ListItem.isListItem(child) && !List.isList(child)) {
                slate.Transforms.wrapNodes(editor, { type: 'list_item', children: [] }, { at: childPath });
                return;
            }
        }
        // To avoid arbitrary nesting, each nested list must be preceded by at
        // least one item. Unwrap all nested lists which aren't.
        const [parent] = slate.Editor.parent(editor, path);
        const [prev] = (_a = slate.Editor.previous(editor, { at: path })) !== null && _a !== void 0 ? _a : [];
        if (List.isList(parent) && prev == null) {
            slate.Transforms.unwrapNodes(editor, { at: path });
            return;
        }
        // There should be no adjacent lists. If there are any merge then into
        // one.
        // TODO: allow for different kinds of lists (e.g. enumerated and
        // itemized) not to be joined.
        const [next, nextPath] = (_b = slate.Editor.next(editor, { at: path })) !== null && _b !== void 0 ? _b : [];
        if (next != null && List.isList(next)) {
            slate.Transforms.mergeNodes(editor, { at: nextPath });
            return;
        }
        if (prev != null && List.isList(prev)) {
            slate.Transforms.mergeNodes(editor, { at: path });
            return;
        }
    }
    if (ListItem.isListItem(node)) {
        // Remove empty items.
        if (slate.Editor.isEmpty(editor, node)) {
            slate.Transforms.removeNodes(editor, { at: path });
            return;
        }
        // List items should only ever exist as children of a list. Replace all
        // other list items with their contents.
        const [parent] = slate.Editor.parent(editor, path);
        if (!List.isList(parent)) {
            slate.Transforms.unwrapNodes(editor, { at: path });
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
    slate.Transforms.liftNodes(editor, {
        at,
        match: ListItem.isListItem,
        mode: 'lowest',
    });
}
/** Increase depth of items in selection */
function increaseDepth(editor, options = {}) {
    slate.Editor.withoutNormalizing(editor, () => {
        var _a, _b;
        const { at = editor.selection } = options;
        if (at == null)
            return;
        const [[, parentPath]] = slate.Editor.levels(editor, {
            at,
            match: n => isComplexBlock(editor, n) && !ListItem.isListItem(n),
            reverse: true,
        });
        const spans = Array.from(spansToWrapInList(editor, parentPath, slate.Editor.range(editor, at)), ([start, end]) => [
            slate.Editor.pathRef(editor, start),
            slate.Editor.pathRef(editor, end, { affinity: 'backward' }),
        ]);
        for (const [startRef, endRef] of spans) {
            const start = startRef.unref();
            const end = endRef.unref();
            const range = slate.Editor.range(editor, start, end);
            const [parent] = slate.Editor.parent(editor, start);
            const match = (n) => parent.children.includes(n);
            const [prev, prevPath] = (_a = slate.Editor.previous(editor, { at: start })) !== null && _a !== void 0 ? _a : [];
            if (List.isList(prev)) {
                slate.Transforms.moveNodes(editor, {
                    at: range,
                    to: prevPath.concat(prev.children.length),
                    match,
                });
                continue;
            }
            const [next, nextPath] = (_b = slate.Editor.next(editor, { at: end })) !== null && _b !== void 0 ? _b : [];
            if (List.isList(next)) {
                slate.Transforms.moveNodes(editor, {
                    at: range,
                    to: nextPath.concat(0),
                    match,
                });
                continue;
            }
            slate.Transforms.wrapNodes(editor, {
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
    return (slate.Editor.isEditor(node) || slate.Element.isElement(node))
        && !slate.Text.isText(node.children[0])
        && !slate.Editor.isInline(editor, node.children[0]);
}
/**
 * Yield a sequence of spans which need to be wrapped in lists to increase depth
 * of selection
 */
function* spansToWrapInList(editor, parentPath, range) {
    let start = null;
    let end = null;
    for (const [child, childPath] of slate.Node.children(editor, parentPath)) {
        if (!slate.Range.includes(range, childPath))
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
    if (slate.Editor.above(editor, { match: n => List.isList(n) })) {
        const node = slate.Editor.node(editor, editor.selection);
        slate.Transforms.splitNodes(editor, { match: ListItem.isListItem, always: true });
        if (node[0].text === '' || node[0].text === '/n' || node[0].text === '/n/n') {
            decreaseDepth(editor);
            slate.Transforms.removeNodes(editor, { match: ListItem.isListItem, at: { path: node[1], offset: 0 } });
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

exports.List = List;
exports.ListItem = ListItem;
exports.Transforms = Transforms;
exports.onKeyDown = onKeyDown;
exports.withLists = withLists;
//# sourceMappingURL=index.cjs.js.map
