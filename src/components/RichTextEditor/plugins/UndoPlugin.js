import {redo, undo} from "prosemirror-history";
import {keydownHandler} from "prosemirror-keymap";
import {Plugin} from 'prosemirror-state';

class UndoView{
    constructor(editorView) {
        this.editorView = editorView;
        this.dom = document.createElement('button');
        this.dom.disabled = !undo(editorView.state);
        this.dom.innerText = 'Undo';
        this.dom.addEventListener('click', (e) => {
            e.preventDefault();
            editorView.focus();
            undo(editorView.state, editorView.dispatch);
        });
    }
    update(){
        this.dom.disabled = !undo(this.editorView.state);
    }
    destroy() { this.dom.remove() }
}

const UndoPlugin = new Plugin({
    view(editorView){
        const view = new UndoView(editorView);
        editorView.dom.parentNode.insertBefore(view.dom, editorView.dom);
        return view;
    },
    props: {
        handleKeyDown: keydownHandler({
            "Mod-z": undo,
            "Mod-y": redo
        })
    },
    update(){
        return true;
    }
});

export default UndoPlugin;
