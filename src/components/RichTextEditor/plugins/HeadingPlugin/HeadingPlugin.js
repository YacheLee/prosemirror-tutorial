import React from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import {setBlockType} from 'prosemirror-commands';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';
import {PARAGRAPH_VALUE} from './config';
import getValue from './getValue';

class ToolbarView{
    constructor(editorView) {
        this.dom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const value = getValue(editorView);

        ReactDOM.render(
            <ToolbarButtonStyle>
                <select value={value} onChange={e=>{
                    e.preventDefault();
                    editorView.focus();

                    const level = parseInt(e.target.value);
                    if (level === PARAGRAPH_VALUE) {
                        const nodeType = editorView.state.schema.nodes.paragraph;
                        setBlockType(nodeType )(editorView.state, editorView.dispatch);
                    }
                    else{
                        const nodeType = editorView.state.schema.nodes.heading;
                        setBlockType(nodeType, { level })(editorView.state, editorView.dispatch);
                    }
                }}>
                    <option value={PARAGRAPH_VALUE}>Paragraph</option>
                    <option value={1}>Heading 1</option>
                    <option value={2}>Heading 2</option>
                    <option value={3}>Heading 3</option>
                    <option value={4}>Heading 4</option>
                    <option value={5}>Heading 5</option>
                    <option value={6}>Heading 6</option>
                </select>
            </ToolbarButtonStyle>
        , this.dom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.dom.remove() }
}

function HeadingPlugin(toolbarDom){
    return new Plugin({
        view(editorView){
            const view = new ToolbarView(editorView);
            toolbarDom.append(view.dom);
            return view;
        },
        update(){
            return true;
        }
    });
}

export default HeadingPlugin;
