import { Element } from 'slate';
/**
 * Interface to which list elements conform.
 *
 * You are free to add other properties to your lists.
 */
export interface List extends Element {
    type: 'list';
}
export declare const List: {
    /**
     * Check if a value implements the [[List]] interface.
     */
    isList(value: unknown): value is List;
};
/**
 * Interface to which list items conform.
 *
 * You are free to add other properties to list items.
 */
export interface ListItem extends Element {
    type: 'list_item';
}
export declare const ListItem: {
    /**
     * Check if a value implements the [[ListItem]] interface.
     */
    isListItem(value: unknown): value is ListItem;
};
