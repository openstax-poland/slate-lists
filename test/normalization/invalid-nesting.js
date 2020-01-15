/** @jsx h */

export const input = <editor>
    <list>
        <list>
            <li>
                <block>There must be at least one item before each nested list</block>
            </li>
        </list>
        <list>
            <li>
                <block>Like here:</block>
            </li>
            <list>
                <li>
                    <block>Properly nested list</block>
                </li>
            </list>
        </list>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>
            <block>There must be at least one item before each nested list</block>
        </li>
        <list>
            <li>
                <block>Like here:</block>
            </li>
            <list>
                <li>
                    <block>Properly nested list</block>
                </li>
            </list>
        </list>
    </list>
</editor>
