import React from "react";
import ReactDOM from "react-dom";
import {MdRedo} from 'react-icons/md';
import {redo} from "prosemirror-history";
import {keydownHandler} from "prosemirror-keymap";
import {Plugin} from 'prosemirror-state';

class RedoView {
    constructor(editorView) {
        this.editorView = editorView;
        this.dom = document.createElement('span');
        this.renderReactComponent(editorView);
    }

    renderReactComponent(editorView) {
        const disabled = !redo(this.editorView.state);
        ReactDOM.render(<MdRedo style={{color: disabled ? "red" : "black"}} onClick={e => {
            e.preventDefault();
            editorView.focus();
            redo(editorView.state, editorView.dispatch);
        }}/>, this.dom);
    }

    update(editorView) {
        this.renderReactComponent(editorView);
    }

    destroy() {
        this.dom.remove()
    }
}

function RedoPlugin(toolbarDom) {
    return new Plugin({
        view(editorView) {
            const view = new RedoView(editorView);
            toolbarDom.append(view.dom);
            return view;
        },
        props: {
            handleKeyDown: keydownHandler({
                "Mod-y": redo
            })
        },
        update() {
            return true;
        }
    });
}

export default RedoPlugin;
