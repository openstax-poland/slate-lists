/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../../src'

export default (editor: Editor) => Transforms.increaseDepth(editor)

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
