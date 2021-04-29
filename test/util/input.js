import { Editor } from 'slate'

import { onKeyDown } from '../../src'

/** Construct a user input simulator for a given editor */
export default function withInput(editor) {
    /**
     * Construct and dispatch a simulated KeyboardEvent, returning whether or
     * not it was cancelled
     */
    function keyEvent(key, options) {
        let cancelled = false

        const event = {
            key,
            altKey: options.alt || false,
            ctrlKey: options.ctrl || false,
            metaKey: options.meta || false,
            shiftKey: options.shift || false,

            preventDefault() {
                cancelled = true
            },
        }

        onKeyDown(editor, event)

        return cancelled
    }

    const input = {
        /** Press enter/paragraph break key */
        break(options={}) {
            if (!keyEvent('Enter', options)) {
                Editor.insertBreak(editor)
            }
            return this
        },
    }

    return input
}
