/** @jsx h */

import { Simulator } from '../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <list>
        <li>
            <block>item</block>
        </li>
        <list>
            <li>
                <block>nested</block>
            </li>
            <li>
                <block><cursor/></block>
            </li>
        </list>
        <li>
            <block>after</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>
            <block>item</block>
        </li>
        <list>
            <li>
                <block>nested</block>
            </li>
        </list>
        <li>
            <block><cursor/></block>
        </li>
        <li>
            <block>after</block>
        </li>
    </list>
</editor>
