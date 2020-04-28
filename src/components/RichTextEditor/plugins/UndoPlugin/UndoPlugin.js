import React from "react";
import ReactDOM from "react-dom";
import {MdUndo} from 'react-icons/md';
import {undo} from "prosemirror-history";
import {keydownHandler} from "prosemirror-keymap";
import {Plugin} from 'prosemirror-state';

class UndoView{
    constructor(editorView) {
        this.editorView = editorView;
        this.dom = document.createElement('span');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const disabled = !undo(this.editorView.state);
        ReactDOM.render(<MdUndo style={{color: disabled ? "red" : "black"}} onClick={e=>{
            e.preventDefault();
            editorView.focus();
            undo(editorView.state, editorView.dispatch);
        }} />, this.dom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.dom.remove() }
}

function UndoPlugin(toolbarDom){
    return new Plugin({
        view(editorView){
            const view = new UndoView(editorView);
            toolbarDom.append(view.dom);
            return view;
        },
        props: {
            handleKeyDown: keydownHandler({
                "Mod-z": undo
            })
        },
        update(){
            return true;
        }
    });
}

export default UndoPlugin;
