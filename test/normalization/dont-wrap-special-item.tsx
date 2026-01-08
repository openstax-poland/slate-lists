/** @jsx h */

export const input = <editor>
    <list>
        <block special={true}>
            <text/>
        </block>
    </list>
</editor>

export const output = input

export const options = {
    isSpecialListItem: (node: any) => node.special,
}
