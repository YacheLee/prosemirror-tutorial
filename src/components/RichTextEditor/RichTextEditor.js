import React, {useEffect, useRef} from 'react';
import {Schema} from 'prosemirror-model';
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {history} from "prosemirror-history";
import UndoPlugin from "./plugins/UndoPlugin";
import RedoPlugin from "./plugins/RedoPlugin";
import BoldPlugin from "./plugins/BoldPlugin";
import ItalicPlugin from './plugins/ItalicPlugin';
import UnderlinePlugin from './plugins/UnderlinePlugin';
import StrikeThroughPlugin from './plugins/StrikeThroughPlugin';

function RichTextEditor() {
    const editor = useRef(null);
    useEffect(() => {
        const plugins = [
            history(),
            UndoPlugin,
            RedoPlugin,
            BoldPlugin,
            ItalicPlugin,
            UnderlinePlugin,
            StrikeThroughPlugin
        ];

        const nodes = {
            doc: {
                content: "paragraph+"
            },
            paragraph: {
                content: "inline*",
                group: "block",
                parseDOM: [{tag: "p"}],
                toDOM: function toDOM() {
                    return ["p", 0]
                }
            },
            text: {
                group: "inline"
            },
        };
        const marks = plugins.map(({spec}) => spec.mark).filter(e => !!e).reduce((prev, cur)=>{
            prev = {...prev, ...cur};
            return prev;
        }, {});

        const state = EditorState.create({
            schema: new Schema({
                nodes,
                marks
            }),
            plugins
        });
        new EditorView(editor.current, {state});
    });

    return (
        <div ref={editor}/>
    );
}

export default RichTextEditor;
