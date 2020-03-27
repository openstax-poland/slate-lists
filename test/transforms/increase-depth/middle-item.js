/** @jsx h **/

import { List } from '../../..'

export const run = editor => List.increaseDepth(editor)

export const input = <editor>
    <list>
        <li>First item</li>
        <li><cursor/>Second item</li>
        <li>Third item</li>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>First item</li>
        <list>
            <li><cursor/>Second item</li>
        </list>
        <li>Third item</li>
    </list>
</editor>
