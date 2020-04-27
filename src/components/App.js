import React, {useEffect, useRef} from 'react';
import {schema} from "prosemirror-schema-basic";
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import './App.css';

function App() {
    const editor = useRef(null);
    useEffect(() => {
        const state = EditorState.create({schema});
        const view = new EditorView(editor.current, {state});
    });

    return (
        <div className="App">
            <div ref={editor}/>
        </div>
    );
}

export default App;
