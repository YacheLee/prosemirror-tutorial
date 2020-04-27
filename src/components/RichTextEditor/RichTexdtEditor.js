import React, {useEffect, useRef} from 'react';
import {schema} from "prosemirror-schema-basic";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import {history} from "prosemirror-history";
import UndoPlugin from "./plugins/UndoPlugin";
import RedoPlugin from "./plugins/RedoPlugin";

function RichTexdtEditor() {
    const editor = useRef(null);
    useEffect(() => {
        const state = EditorState.create({
            schema,
            plugins: [
                history(),
                UndoPlugin,
                RedoPlugin
            ]
        });
        new EditorView(editor.current, {state});
    });

    return (
        <div className="App">
            <div ref={editor}/>
        </div>
    );
}

export default RichTexdtEditor;
