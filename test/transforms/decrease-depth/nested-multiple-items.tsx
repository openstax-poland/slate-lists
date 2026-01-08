/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../../src'

export default (editor: Editor) => Transforms.decreaseDepth(editor)

export const input = <editor>
    <list>
        <li>
            <block><anchor/>First item</block>
        </li>
        <list>
            <li>
                <block>First nested item</block>
            </li>
            <li>
                <block><focus/>Second nested item</block>
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
    <block><anchor/>First item</block>
    <list>
        <li>
            <block>First nested item</block>
        </li>
        <li>
            <block><focus/>Second nested item</block>
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
