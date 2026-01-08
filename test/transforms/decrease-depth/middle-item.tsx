/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../../src'

export default (editor: Editor) => Transforms.decreaseDepth(editor)

export const input = <editor>
    <list>
        <li>
            <block>First item</block>
        </li>
        <li>
            <block><cursor/>Second item</block>
        </li>
        <li>
            <block>Third item</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>
            <block>First item</block>
        </li>
    </list>
    <block><cursor/>Second item</block>
    <list>
        <li>
            <block>Third item</block>
        </li>
    </list>
</editor>
