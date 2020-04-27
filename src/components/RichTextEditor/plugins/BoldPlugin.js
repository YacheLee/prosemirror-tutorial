import React from "react";
import ReactDOM from "react-dom";
import {MdFormatBold} from 'react-icons/md';
import {Plugin} from 'prosemirror-state';
import {toggleMark} from "prosemirror-commands";

function isActive(editorView, type) {
    return !!markActive(editorView.state, type);
}

function markActive(state, type) {
    const ref = state.selection;
    const from = ref.from;
    const $from = ref.$from;
    const to = ref.to;
    const empty = ref.empty;
    if (empty) {
        return type.isInSet(state.storedMarks || $from.marks());
    } else {
        return state.doc.rangeHasMark(from, to, type);
    }
}

class BoldView{
    constructor(editorView) {
        this.editorView = editorView;
        this.dom = document.createElement('span');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const markType = editorView.state.schema.marks.strong;

        const isUsing = isActive(editorView, markType);

        ReactDOM.render(<MdFormatBold style={{color: isUsing ? "blue" : "black"}} onClick={e=>{
            e.preventDefault();
            editorView.focus();
            toggleMark(markType, {strong: true})(editorView.state, editorView.dispatch);
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
    update(){
        return true;
    }
});

export default BoldPlugin;
