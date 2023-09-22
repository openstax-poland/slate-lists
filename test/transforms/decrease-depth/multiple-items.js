/** @jsx h */

import { Transforms } from '../../..'

export const run = editor => Transforms.decreaseDepth(editor)

export const input = <editor>
    <list>
        <li>
            <block><anchor/>First item</block>
        </li>
        <li>
            <block>Second item<focus/></block>
        </li>
        <li>
            <block>Third item</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <block><anchor/>First item</block>
    <block>Second item<focus/></block>
    <list>
        <li>
            <block>Third item</block>
        </li>
    </list>
</editor>
