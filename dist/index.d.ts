import { Editor } from 'slate';
import { decreaseDepth, increaseDepth } from './transforms';
export { onKeyDown } from './handlers';
export { List, ListItem } from './interfaces';
/** A slate editor augmented with support for lists. */
export interface ListEditor extends Editor {
}
/** Augment an editor with list related functionality and behaviours. */
export declare function withLists<T extends Editor>(editor: T): T & ListEditor;
export declare const Transforms: {
    decreaseDepth: typeof decreaseDepth;
    increaseDepth: typeof increaseDepth;
};
