/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../..'

export const run = editor => Transforms.increaseDepth(editor)

export const input = <editor>
    <list>
        <li>
            <block>one</block>
        </li>
        <li>
            <block><anchor/>two</block>
        </li>
        <list>
            <li>
                <block>three<focus/></block>
            </li>
            <li>
                <block>four</block>
            </li>
        </list>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>
            <block>one</block>
        </li>
        <list>
            <li>
                <block><anchor/>two</block>
            </li>
            <list>
                <li>
                    <block>three<focus/></block>
                </li>
            </list>
            <li>
                <block>four</block>
            </li>
        </list>
    </list>
</editor>
