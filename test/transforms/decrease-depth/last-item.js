/** @jsx h **/

import { Transforms } from '../../..'

export const run = editor => Transforms.decreaseDepth(editor)

export const input = <editor>
    <list>
        <li>
            <block>First item</block>
        </li>
        <li>
            <block>Second item</block>
        </li>
        <li>
            <block><cursor/>Third item</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>
            <block>First item</block>
        </li>
        <li>
            <block>Second item</block>
        </li>
    </list>
    <block><cursor/>Third item</block>
</editor>
