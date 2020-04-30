import React from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import mark from './mark';
import {getColor} from './commands';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';
import TextColorToolbarButton from './TextColorToolbarButton';

class ToolbarView{
    constructor(editorView) {
        this.dom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const value = getColor(editorView);
        ReactDOM.render(<ToolbarButtonStyle>
            <TextColorToolbarButton editorView={editorView} value={value} />
        </ToolbarButtonStyle>,
        this.dom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.dom.remove() }
}

function TextColorPlugin(toolbarDom){
    const pluginConfig = {
        view(editorView){
            const view = new ToolbarView(editorView);
            toolbarDom.append(view.dom);
            return view;
        },
        update(){
            return true;
        },
        mark
    };

    return new Plugin(pluginConfig);
}

export default TextColorPlugin;
