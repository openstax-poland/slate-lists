/** @jsx h */

import { Editor } from 'slate'
import { Transforms } from '../../..'

export const run = editor => Transforms.increaseDepth(editor)

export const input = <editor>
    <list>
        <li>
            <block>one</block>
        </li>
        <list>
            <li>
                <block>two</block>
            </li>
            <li>
                <block><cursor/>three</block>
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
                <block>two</block>
            </li>
            <list>
                <li>
                    <block><cursor/>three</block>
                </li>
            </list>
        </list>
    </list>
</editor>
