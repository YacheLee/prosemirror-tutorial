import React from "react";
import ReactDOM from "react-dom";
import {MdFormatItalic} from 'react-icons/md';
import {Plugin} from 'prosemirror-state';
import {toggleMark} from "prosemirror-commands";
import {keydownHandler} from "prosemirror-keymap";
import {isActive} from './utils';

function toggle(editorState, dispatch){
    toggleMark(editorState.schema.marks.italic, {italic: true})(editorState, dispatch);
}

const ItalicPlugin = new Plugin({
    view(editorView){
        const view = new BoldView(editorView);
        editorView.dom.parentNode.insertBefore(view.dom, editorView.dom);
        return view;
    },
    props: {
        handleKeyDown: keydownHandler({
            "Mod-i": (editorState, dispatch)=>{
                toggle(editorState, dispatch);
            }
        })
    },
    update(){
        return true;
    }
});

class BoldView{
    constructor(editorView) {
        this.dom = document.createElement('span');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const markType = editorView.state.schema.marks.italic;
        const isUsing = isActive(editorView.state, markType);

        ReactDOM.render(<MdFormatItalic style={{color: isUsing ? "blue" : "black"}} onClick={e=>{
            e.preventDefault();
            editorView.focus();
            toggle(editorView.state, editorView.dispatch);
        }} />, this.dom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.dom.remove() }
}

export default ItalicPlugin;
