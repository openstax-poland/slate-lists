import { Editor, NodeEntry } from 'slate';
import { ListEditorOptions } from '.';
export default function normalizeNode(options: ListEditorOptions, normalizeNode: (entry: NodeEntry) => void, editor: Editor, entry: NodeEntry): void;
