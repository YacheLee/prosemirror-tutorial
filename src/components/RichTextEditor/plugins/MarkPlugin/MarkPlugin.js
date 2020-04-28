import React from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import {toggleMark} from "prosemirror-commands";
import {keydownHandler} from "prosemirror-keymap";
import {isActive} from './utils';

function MarkPlugin(Icon, mark, markType, attr, hotkey){
    function toggle(editorState, dispatch){
        toggleMark(editorState.schema.marks[markType], {[attr]: true})(editorState, dispatch);
    }

    class ToolbarView{
        constructor(editorView) {
            this.dom = document.createElement('span');
            this.renderReactComponent(editorView);
        }
        renderReactComponent(editorView){
            const mark = editorView.state.schema.marks[markType];

            ReactDOM.render(<Icon style={{color: isActive(editorView.state, mark) ? "blue" : "black"}} onClick={e=>{
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

    const pluginConfig = {
        view(editorView){
            const view = new ToolbarView(editorView);
            editorView.dom.parentNode.insertBefore(view.dom, editorView.dom);
            return view;
        },
        update(){
            return true;
        },
        mark
    };

    if(!!hotkey){
        pluginConfig.props = {
            handleKeyDown: keydownHandler({
                [hotkey]: toggle
            })
        };
    }

    return new Plugin(pluginConfig);
}

export default MarkPlugin;
