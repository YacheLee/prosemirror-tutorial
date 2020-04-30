import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import {Plugin} from 'prosemirror-state';
import Popover from '@material-ui/core/Popover';
import {CompactPicker} from 'react-color';
import mark from './mark';
import {changeColor, getColor} from './commands';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';
import AButton from './AButton';

function TextColorPopover({editorView, value}){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'text-color-popover' : undefined;

    return <Fragment>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
                setAnchorEl(null);
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
            <CompactPicker color={value} onChange={({hex}) => {
                if(hex){
                    changeColor(editorView, hex);
                    setAnchorEl(null);
                }
            }} />
        </Popover>
        <AButton color={value} onClick={(e) => {
            e.preventDefault();
            editorView.focus();
            setAnchorEl(e.currentTarget);
        }}/>
    </Fragment>
}

class ToolbarView{
    constructor(editorView) {
        this.dom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        const value = getColor(editorView);
        ReactDOM.render(<ToolbarButtonStyle>
            <TextColorPopover editorView={editorView} value={value} />
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
