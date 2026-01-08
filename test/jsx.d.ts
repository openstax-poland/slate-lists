// NOTE: you cannot use import statements in this file!

type Props<T> = Omit<T, 'type' | 'children'>

declare module JSX {
    interface IntrinsicElements {
        block: Record<string, unknown>
        text: {}
        editor: {}
        cursor: {}
        focus: {}
        anchor: {}

        li: Props<import('../src').ListItem>
        list: Props<import('../src').List>
    }
}
