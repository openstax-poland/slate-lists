/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../../src'

export default (editor: Editor) => Transforms.increaseDepth(editor)

export const input = <editor>
    <list custom-attribute="1">
        <li>
            <block>one</block>
        </li>
    </list>
    <block><cursor/>between</block>
    <list custom-attribute="2">
        <li>
            <block>two</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <list custom-attribute="1">
        <li>
            <block>one</block>
        </li>
        <li>
            <block><cursor/>between</block>
        </li>
        <li>
            <block>two</block>
        </li>
    </list>
</editor>
