/** @jsx h */

export default input => input.break().break()

export const input = <editor>
    <list>
        <li>
            <block>Some<cursor/>text</block>
        </li>
    </list>
</editor>

export const output = <editor>
    <list>
        <li>
            <block>Some</block>
        </li>
        <li>
            <block><text/></block>
        </li>
        <li>
            <block><cursor/>text</block>
        </li>
    </list>
</editor>
