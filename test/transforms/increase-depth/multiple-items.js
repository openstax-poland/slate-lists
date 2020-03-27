/** @jsx h **/

import { List } from '../../..'

export const run = editor => List.increaseDepth(editor)

export const input = <editor>
    <list>
        <li>First item</li>
        <li><anchor/>Second item</li>
        <li>Third item<focus/></li>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>First item</li>
        <list>
            <li><anchor/>Second item</li>
            <li>Third item<focus/></li>
        </list>
    </list>
</editor>
