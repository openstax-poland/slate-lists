/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../../src'

export default (editor: Editor) => Transforms.increaseDepth(editor)

export const input = <editor>
    <block>one</block>
    <block><anchor/>two</block>
    <block>three<focus/></block>
    <block>four</block>
</editor>

export const output = <editor>
    <block>one</block>
    <list>
        <li>
            <block><anchor/>two</block>
        </li>
        <li>
            <block>three<focus/></block>
        </li>
    </list>
    <block>four</block>
</editor>
