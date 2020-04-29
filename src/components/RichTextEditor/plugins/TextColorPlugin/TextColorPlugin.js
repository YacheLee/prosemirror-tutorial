import React, {useState} from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import {MdTextFormat} from 'react-icons/md';
import Popover from 'react-tiny-popover';
import {CompactPicker} from 'react-color';
import mark from './mark';
import {changeColor, getColor} from './commands';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';

function TextColorPopover({editorView, value, onChange}){
    const [open, setOpen] = useState(false);

    return <Popover
        containerStyle={{zIndex: 1}}
        isOpen={open}
        position={'bottom'}
        onClickOutside={() => setOpen(false)}
        content={(<CompactPicker color={value} onChange={({hex}) => {
            if(hex){
                onChange(hex);
                setOpen(false);
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
        this.dom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const value = getColor(editorView);
        ReactDOM.render(<ToolbarButtonStyle><TextColorPopover editorView={editorView} value={value} onChange={value=>{
            changeColor(editorView, value, editorView.state, editorView.dispatch);
        }} /></ToolbarButtonStyle>, this.dom);
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
