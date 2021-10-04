// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import normalizeNode from './normalize';
import { decreaseDepth, increaseDepth } from './transforms';
export { onKeyDown } from './handlers';
export { List, ListItem } from './interfaces';
/** Augment an editor with list related functionality and behaviours. */
export function withLists(editor) {
    const { normalizeNode: oldNormalizeNode } = editor;
    editor.normalizeNode = normalizeNode.bind(null, oldNormalizeNode, editor);
    return editor;
}
export const Transforms = {
    decreaseDepth,
    increaseDepth,
};
