/** @jsx h */

import { Transforms } from '../../..'

export const run = editor => Transforms.increaseDepth(editor)

export const input = <editor>
    <block><anchor/>before</block>
    <list custom-attribute>
        <li>
            <block>one</block>
        </li>
        <li>
            <block><focus/>two</block>
        </li>
        <li>
            <block>three</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <list custom-attribute>
        <li>
            <block><anchor/>before</block>
        </li>
        <list>
            <li>
                <block>one</block>
            </li>
            <li>
                <block><focus/>two</block>
            </li>
        </list>
        <li>
            <block>three</block>
        </li>
    </list>
</editor>
