/** @jsx h **/

import { List } from '../../..'

export const run = editor => List.increaseDepth(editor)

export const input = <editor>
    <block>one</block>
    <block><cursor/>two</block>
    <block>three</block>
</editor>

export const output = <editor>
    <block>one</block>
    <list>
        <li>
            <block><cursor/>two</block>
        </li>
    </list>
    <block>three</block>
</editor>
