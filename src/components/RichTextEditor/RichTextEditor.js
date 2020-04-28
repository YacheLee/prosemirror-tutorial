import React, {useEffect, useRef} from 'react';
import {Schema} from 'prosemirror-model';
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {history} from "prosemirror-history";
import UndoPlugin from "./plugins/UndoPlugin";
import RedoPlugin from "./plugins/RedoPlugin";
import BoldPlugin from "./plugins/BoldPlugin";
import ItalicPlugin from './plugins/ItalicPlugin';

function RichTextEditor() {
    const editor = useRef(null);
    useEffect(() => {
        const state = EditorState.create({
            schema: new Schema({
                nodes: {
                    doc: {
                        content: "paragraph+"
                    },
                    paragraph: {
                        content: "inline*",
                        group: "block",
                        parseDOM: [{tag: "p"}],
                        toDOM: function toDOM() { return ["p", 0] }
                    },
                    text: {
                        group: "inline"
                    },
                },
                marks: {
                    strong: {
                        parseDOM: [{tag: "strong"},
                            // This works around a Google Docs misbehavior where
                            // pasted content will be inexplicably wrapped in `<b>`
                            // tags with a font-weight normal.
                            {tag: "b", getAttrs: function (node) { return node.style.fontWeight !== "normal" && null; }},
                            {style: "font-weight", getAttrs: function (value) { return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null; }}],
                        toDOM: function toDOM() { return ["b", 0] }
                    },
                    italic: {
                        parseDOM: [{tag: "i"}, {tag: "em"}, {style: "font-style=italic"}],
                        toDOM: function toDOM() { return ["em", 0] }
                    }
                }
            }),
            plugins: [
                history(),
                UndoPlugin,
                RedoPlugin,
                BoldPlugin,
                ItalicPlugin
            ]
        });
        new EditorView(editor.current, {state});
    });

    return (
        <div ref={editor}/>
    );
}

export default RichTextEditor;
