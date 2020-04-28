import React from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import {setBlockType} from 'prosemirror-commands';

const HEADING_DEFAULT_VALUE = 0;

function getSelectedHeadingValue(headingNodes = []) {
    const set = new Set(headingNodes.map((node) => node.attrs.level));

    if (set.size === 1) {
        return set.values().next().value;
    } else {
        return HEADING_DEFAULT_VALUE;
    }
}

function getHeading(editorView) {
    const { selection, tr } = editorView.state;
    const { from, to } = selection;
    const blockNodes = [];
    const headingNodes = [];
    tr.doc.nodesBetween(tr.mapping.map(from), tr.mapping.map(to), (node) => {
        if (node.isBlock) {
            blockNodes.push(node);
            if (node.type.name === 'heading') {
                headingNodes.push(node);
            }
        }
    });

    if (blockNodes.length === headingNodes.length) {
        return getSelectedHeadingValue(headingNodes);
    } else {
        return HEADING_DEFAULT_VALUE;
    }
}

class ToolbarView{
    constructor(editorView) {
        this.dom = document.createElement('span');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const value = getHeading(editorView);

        ReactDOM.render(
            <select value={value} onChange={e=>{
                e.preventDefault();
                editorView.focus();

                const level = parseInt(e.target.value);
                if (level === 0) {
                    const nodeType = editorView.state.schema.nodes.paragraph;
                    setBlockType(nodeType )(editorView.state, editorView.dispatch);
                }
                else{
                    const nodeType = editorView.state.schema.nodes.heading;
                    setBlockType(nodeType, { level })(editorView.state, editorView.dispatch);
                }
            }}>
                <option value={0}>Paragraph</option>
                <option value={1}>H1</option>
            </select>
        , this.dom);
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
    }
};

export default new Plugin(pluginConfig);
