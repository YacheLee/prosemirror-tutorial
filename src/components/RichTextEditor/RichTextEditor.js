import React, {useEffect, useRef} from 'react';
import {Schema} from 'prosemirror-model';
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import plugins from "./plugins";
import nodes from "./nodes";
import marks from "./marks";
import './editor.css';

function RichTextEditor() {
    const editor = useRef(null);
    useEffect(() => {
        const state = EditorState.create({
            schema: new Schema({ nodes, marks }),
            plugins
        });
        new EditorView(editor.current, {state});
    });

    return (
        <div ref={editor}/>
    );
}

export default RichTextEditor;
