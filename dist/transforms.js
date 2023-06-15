// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import { Editor, Element, Node, Range, Text, Transforms } from 'slate';
import { List, ListItem } from './interfaces';
/** Decrease depth of items in selection */
export function decreaseDepth(editor, options = {}) {
    const { at = editor.selection } = options;
    if (at == null)
        return;
    Transforms.liftNodes(editor, {
        at,
        match: ListItem.isListItem,
        mode: 'lowest',
    });
}
/** Increase depth of items in selection */
export function increaseDepth(editor, options = {}) {
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
                Transforms.moveNodes(editor, {
                    at: range,
                    to: prevPath.concat(prev.children.length),
                    match,
                });
                continue;
            }
            const [next, nextPath] = (_b = Editor.next(editor, { at: end })) !== null && _b !== void 0 ? _b : [];
            if (List.isList(next)) {
                Transforms.moveNodes(editor, {
                    at: range,
                    to: nextPath.concat(0),
                    match,
                });
                continue;
            }
            Transforms.wrapNodes(editor, {
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
