import React from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import {setBlockType} from 'prosemirror-commands';

const PARAGRAPH_VALUE = 0;

function getSelectedHeadingValue(headingNodes = []) {
    const set = new Set(headingNodes.map((node) => node.attrs.level));

    if (set.size === 1) {
        return set.values().next().value;
    } else {
        return PARAGRAPH_VALUE;
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
        return PARAGRAPH_VALUE;
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
