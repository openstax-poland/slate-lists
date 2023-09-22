import { Editor, Node } from 'slate';
import { decreaseDepth, increaseDepth } from './transforms';
export { onKeyDown } from './handlers';
export { List, ListItem } from './interfaces';
/** A slate editor augmented with support for lists. */
export interface ListEditor extends Editor {
}
/** Options for the lists plugin */
export interface ListEditorOptions {
    /**
     * Check if a node special-purpose list item
     *
     * The plugin will allow these nodes in lists in addition to list items and
     * nested lists. You should be very careful what you allow here, as this is
     * not tested.
     */
    isSpecialListItem: (node: Node) => boolean;
}
/** Augment an editor with list related functionality and behaviours. */
export declare function withLists<T extends Editor>(editor: T): T & ListEditor;
export declare function withLists<T extends Editor>(options: Partial<ListEditorOptions>, editor: T): T & ListEditor;
export declare const Transforms: {
    decreaseDepth: typeof decreaseDepth;
    increaseDepth: typeof increaseDepth;
};
