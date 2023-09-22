import { Editor, Location } from 'slate';
/** Decrease depth of items in selection */
export declare function decreaseDepth(editor: Editor, options?: {
    at?: Location;
}): void;
/** Increase depth of items in selection */
export declare function increaseDepth(editor: Editor, options?: {
    at?: Location;
}): void;
