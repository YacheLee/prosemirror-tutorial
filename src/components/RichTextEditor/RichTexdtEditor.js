import React, {useEffect, useRef} from 'react';
import {schema} from "prosemirror-schema-basic";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {history} from "prosemirror-history";
import UndoPlugin from "./plugins/UndoPlugin";
import RedoPlugin from "./plugins/RedoPlugin";
import BoldPlugin from "./plugins/BoldPlugin";

function RichTexdtEditor() {
    const editor = useRef(null);
    useEffect(() => {
        const state = EditorState.create({
            schema,
            plugins: [
                history(),
                UndoPlugin,
                RedoPlugin,
                BoldPlugin
            ]
        });
        new EditorView(editor.current, {state});
    });

    return (
        <div ref={editor}/>
    );
}

export default RichTexdtEditor;
