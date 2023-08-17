import { Element } from 'slate';
/**
 * Interface to which list elements conform.
 *
 * You are free to add other properties to your lists.
 */
export interface List {
    type: 'list';
    children: ListElement[];
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
export interface ListItem {
    type: 'list_item';
    children: Element[];
}
export type ListElement = List | ListItem;
export declare const ListItem: {
    /**
     * Check if a value implements the [[ListItem]] interface.
     */
    isListItem(value: unknown): value is ListItem;
};
declare module 'slate' {
    interface CustomTypes {
        Element: List | ListItem;
    }
}
