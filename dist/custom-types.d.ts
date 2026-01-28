import { List, ListItem } from './interfaces';
declare module 'slate' {
    interface CustomTypes {
        Element: List | ListItem;
    }
}
