# Changelog

## Unreleased

## 0.2.0 - Slate custom types

Upgraded to slate >= 0.60, added support for custom types. To use lists add
`List | ListItem` to `slate.CustomTypes.Element` alongside your element types.

To add your own list types, create an interface for your list type extending
`BaseList`

```ts
import { BaseList, BaseListItem } from 'slate-lists'

interface MyList extends BaseList {
    // ...
}

interface MyListItem extends BaseListItem {
    // ...
}
```

and add it then to both `slate.CustomTypes.Element` and `slate-lists.CustomTypes`

```ts
// custom-types.ts

import { MyList, MyListItem, /*..*/ } from '..'

declare module 'slate' {
    interface CustomTypes {
        Element: MyList /* | my other elements */
    }
}

declare module 'slate-lists' {
    interface CustomTypes {
        List: MyList
        ListItem: MyListItem
    }
}
```

Additionally, the `options` argument to `withLists` has been removed, and
`isSpecialListItem` moved to `ListEditor`. If you use custom list items you need
to change your editor setup as follows:

```ts
// Old code

const listEditor = withLists({ isSpecialListItem }, editor)

// New code

const listEditor = withLists(editor)
listEditor.isSpecialListItem = isSpecialListItem
```
