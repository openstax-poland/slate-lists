/** @jsx h */

import { ListEditor } from '../../src'

export const input = <editor>
    <list>
        <block special={true}>
            <text/>
        </block>
    </list>
</editor>

export const output = input

export const withEditor = (editor: ListEditor) => {
    editor.isSpecialListItem = (node: any) => node.special
    return editor
}
