/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../../src'

export default (editor: Editor) => Transforms.increaseDepth(editor)

export const input = <editor>
    <block><cursor/>before</block>
    <list custom-attribute>
        <li>
            <block>one</block>
        </li>
        <li>
            <block>two</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <list custom-attribute>
        <li>
            <block><cursor/>before</block>
        </li>
        <li>
            <block>one</block>
        </li>
        <li>
            <block>two</block>
        </li>
    </list>
</editor>
