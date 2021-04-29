/** @jsx h */

export default input => input.break({ shift: true }).break({ shift: true })

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
            <block><text/></block>
            <block><cursor/>text</block>
        </li>
    </list>
</editor>
