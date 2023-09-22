// Copyright 2020 OpenStax Poland
// Licensed under the MIT license. See LICENSE file in the project root for
// full license text.
import normalizeNode from './normalize';
import { decreaseDepth, increaseDepth } from './transforms';
export { onKeyDown } from './handlers';
export { List, ListItem } from './interfaces';
const DEFAULT_OPTIONS = {
    isSpecialListItem: () => false,
};
export function withLists(...args) {
    const editor = args.length === 2 ? args[1] : args[0];
    const userOptions = args.length === 2 ? args[0] : {};
    const options = { ...DEFAULT_OPTIONS, ...userOptions };
    const { normalizeNode: oldNormalizeNode } = editor;
    editor.normalizeNode = normalizeNode.bind(null, options, oldNormalizeNode, editor);
    return editor;
}
export const Transforms = {
    decreaseDepth,
    increaseDepth,
};
