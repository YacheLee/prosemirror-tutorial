import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import {MdTextFormat} from 'react-icons/md';
import Popover from 'react-tiny-popover';
import {CompactPicker} from 'react-color';
import mark from './mark';
import {changeColor, getColor} from './commands';

function TextColorPopover({editorView, value, onChange}){
    const [open, setOpen] = useState(false);

    return <Popover
        isOpen={open}
        position={'top'}
        onClickOutside={() => setOpen(false)}
        content={(<CompactPicker color={value} onChange={({hex}) => {
            if(hex){
                onChange(hex);
            }
        }} />)}
    >
        <MdTextFormat type='color' onClick={(e) => {
            e.preventDefault();
            editorView.focus();
            setOpen(!open);
        }}/>
    </Popover>;
}

class ToolbarView{
    constructor(editorView) {
        this.dom = document.createElement('span');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const value = getColor(editorView);
        ReactDOM.render(<TextColorPopover editorView={editorView} value={value} onChange={value=>{
            changeColor(editorView, value, editorView.state, editorView.dispatch);
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

const TextColorPlugin = new Plugin(pluginConfig);

export default TextColorPlugin;
