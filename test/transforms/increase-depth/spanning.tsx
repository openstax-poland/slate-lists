/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../../src'

export default (editor: Editor) => Transforms.increaseDepth(editor)

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
