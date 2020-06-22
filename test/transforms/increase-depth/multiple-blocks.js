/** @jsx h **/

import { Transforms } from '../../..'

export const run = editor => Transforms.increaseDepth(editor)

export const input = <editor>
    <block>one</block>
    <block><anchor/>two</block>
    <block>three<focus/></block>
    <block>four</block>
</editor>

export const output = <editor>
    <block>one</block>
    <list>
        <li>
            <block><anchor/>two</block>
        </li>
        <li>
            <block>three<focus/></block>
        </li>
    </list>
    <block>four</block>
</editor>
