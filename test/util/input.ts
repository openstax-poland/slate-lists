import { Editor } from 'slate'

import { onKeyDown } from '../../src'

export interface Simulator {
    delete(options?: EventOptions): this
    backspace(options?: EventOptions): this
    break(options?: EventOptions): this
}

type EventOptions = {
    alt?: boolean,
    ctrl?: boolean,
    meta?: boolean,
    shift?: boolean,
}

/** Construct a user input simulator for a given editor */
export default function simulateInput(editor: Editor): Simulator {
    /**
     * Construct and dispatch a simulated KeyboardEvent, returning whether or
     * not it was cancelled
     */
    function keyEvent(key: string, options: EventOptions) {
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

        onKeyDown(editor, event as KeyboardEvent)

        return cancelled
    }

    const input: Simulator = {
        /** Press delete key */
        delete(options: EventOptions = {}) {
            if (!keyEvent('Delete', options)) {
                Editor.deleteForward(editor)
            }
            return this
        },

        /** Press backspace key */
        backspace(options: EventOptions = {}) {
            if (!keyEvent('Backspace', options)) {
                Editor.deleteBackward(editor)
            }
            return this
        },

        /** Press enter/paragraph break key */
        break(options: EventOptions = {}) {
            if (!keyEvent('Enter', options)) {
                Editor.insertBreak(editor)
            }
            return this
        },
    }

    return input
}
