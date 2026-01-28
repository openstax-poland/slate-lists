import { Descendant, Element } from 'slate';
type ExtendableTypes = 'List' | 'ListItem';
export interface CustomTypes {
    [key: string]: unknown;
}
export type ExtendedType<K extends ExtendableTypes, B> = unknown extends CustomTypes[K] ? B : CustomTypes[K];
/**
 * Interface to which list elements conform.
 *
 * You are free to add other properties to your lists.
 */
export interface BaseList {
    type: 'list';
    children: Descendant[];
}
export type List = ExtendedType<'List', BaseList>;
export declare const List: {
    /**
     * Check if a value implements the [[List]] interface.
     */
    isList(this: void, value: unknown): value is List;
};
/**
 * Interface to which list items conform.
 *
 * You are free to add other properties to list items.
 */
export interface BaseListItem {
    type: 'list_item';
    children: Element[];
}
export type ListItem = ExtendedType<'ListItem', BaseListItem>;
export declare const ListItem: {
    /**
     * Check if a value implements the [[ListItem]] interface.
     */
    isListItem(this: void, value: unknown): value is ListItem;
};
export {};
