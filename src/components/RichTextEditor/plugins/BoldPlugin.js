import React from "react";
import ReactDOM from "react-dom";
import {MdFormatBold} from 'react-icons/md';
import {Plugin} from 'prosemirror-state';
import {toggleMark} from "prosemirror-commands";
import {keydownHandler} from "prosemirror-keymap";

function isActive(editorState, type) {
    return !!markActive(editorState, type);
}

function markActive(state, type) {
    const {selection} = state;
    const {from, $from, to, empty} = selection;
    if (empty) {
        return type.isInSet(state.storedMarks || $from.marks());
    } else {
        return state.doc.rangeHasMark(from, to, type);
    }
}

function toggleBold(editorState, dispatch){
    toggleMark(editorState.schema.marks.strong, {strong: true})(editorState, dispatch);
}

class BoldView{
    constructor(editorView) {
        this.editorView = editorView;
        this.dom = document.createElement('span');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const markType = editorView.state.schema.marks.strong;

        const isBolding = isActive(editorView.state, markType);

        ReactDOM.render(<MdFormatBold style={{color: isBolding ? "blue" : "black"}} onClick={e=>{
            e.preventDefault();
            editorView.focus();
            toggleBold(editorView.state, editorView.dispatch);
        }} />, this.dom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.dom.remove() }
}

const BoldPlugin = new Plugin({
    view(editorView){
        const view = new BoldView(editorView);
        editorView.dom.parentNode.insertBefore(view.dom, editorView.dom);
        return view;
    },
    props: {
        handleKeyDown: keydownHandler({
            "Mod-b": (editorState, dispatch)=>{
                toggleBold(editorState, dispatch);
            }
        })
    },
    update(){
        return true;
    }
});

export default BoldPlugin;
