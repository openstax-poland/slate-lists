import { List, ListItem } from './interfaces'

/* eslint-disable @typescript-eslint/naming-convention */
declare module 'slate' {
    interface CustomTypes {
        Element: List | ListItem
    }
}
