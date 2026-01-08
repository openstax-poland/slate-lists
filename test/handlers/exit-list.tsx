/** @jsx h */

import { Simulator } from '../util/input'

export default (input: Simulator) => input.break()

export const input = <editor>
    <list>
        <li>
            <block>item</block>
        </li>
        <li>
            <block><cursor/></block>
        </li>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>
            <block>item</block>
        </li>
    </list>
    <block><cursor/></block>
</editor>
