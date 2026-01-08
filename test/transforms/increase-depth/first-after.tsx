/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../../src'

export default (editor: Editor) => Transforms.increaseDepth(editor)

export const input = <editor>
    <list custom-attribute>
        <li>
            <block>one</block>
        </li>
        <li>
            <block>two</block>
        </li>
    </list>
    <block><cursor/>after</block>
</editor>

export const output = <editor>
    <list custom-attribute>
        <li>
            <block>one</block>
        </li>
        <li>
            <block>two</block>
        </li>
        <li>
            <block><cursor/>after</block>
        </li>
    </list>
</editor>
