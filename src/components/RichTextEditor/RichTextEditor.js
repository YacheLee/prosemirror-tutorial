import React, {useEffect, useRef} from 'react';
import {Schema} from 'prosemirror-model';
import styled from 'styled-components';
import {EditorState} from "prosemirror-state";
import {EditorView} from "prosemirror-view";
import Paper from '@material-ui/core/Paper';
import plugins from "./plugins";
import nodes from "./nodes";
import marks from "./marks";
import './editor.css';

const Toolbar = styled.div`
  padding: 4px 8px 4px 14px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  width: 100%;
  flex-wrap: nowrap;
  overflow-x: auto;
  display: flex;
  flex: 0 0 auto;
  flex-shrink: 0;
`;

function RichTextEditor() {
    const editor = useRef(null);
    const toolbar = useRef(null);

    useEffect(() => {
        const _plugins = plugins(toolbar.current);
        const state = EditorState.create({
            schema: new Schema({ nodes, marks: marks(_plugins) }),
            plugins: _plugins
        });
        new EditorView(editor.current, {state});
    });

    return (
        <Paper style={{margin: 12}}>
            <Toolbar ref={toolbar} />
            <div ref={editor} />
        </Paper>
    );
}

export default RichTextEditor;
