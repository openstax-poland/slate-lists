/** @jsx h **/

import { Transforms } from '../../..'

export const run = editor => Transforms.decreaseDepth(editor)

export const input = <editor>
    <list>
        <li>
            <block>First item</block>
        </li>
        <list>
            <li>
                <block>First nested item</block>
            </li>
            <li>
                <block><cursor/>Second nested item</block>
            </li>
            <li>
                <block>Third nested item</block>
            </li>
        </list>
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
        <list>
            <li>
                <block>First nested item</block>
            </li>
        </list>
        <li>
            <block><cursor/>Second nested item</block>
        </li>
        <list>
            <li>
                <block>Third nested item</block>
            </li>
        </list>
        <li>
            <block>Third item</block>
        </li>
    </list>
</editor>
