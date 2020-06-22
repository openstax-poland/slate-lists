/** @jsx h **/

import { Transforms } from '../../..'

export const run = editor => Transforms.decreaseDepth(editor)

export const input = <editor>
    <list>
        <li>
            <block><cursor/>First item</block>
        </li>
        <li>
            <block>Second item</block>
        </li>
        <li>
            <block>Third item</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <block><cursor/>First item</block>
    <list>
        <li>
            <block>Second item</block>
        </li>
        <li>
            <block>Third item</block>
        </li>
    </list>
</editor>
