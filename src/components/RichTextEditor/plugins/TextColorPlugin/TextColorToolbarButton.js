import React from "react";
import {CompactPicker} from 'react-color';
import {changeColor} from './commands';
import AButton from './AButton';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';
import {closePopover, getPopoverElement, setPopoverAnchorElement, setPopoverContent} from '../../RichTextEditor';

function TextColorToolbarButton({editorView, value, toolbarButtonDom}) {
    return <ToolbarButtonStyle onClick={(event) => {
        event.preventDefault();

        //toggle
        if(getPopoverElement()===toolbarButtonDom){
            closePopover();
        }
        else{
            setPopoverAnchorElement(toolbarButtonDom);
            setPopoverContent(
                <CompactPicker color={value} onChangeComplete={({hex}) => {
                    if(hex){
                        changeColor(editorView, hex);
                        closePopover();
                    }
                }} />
            );
        }
    }}>
        <AButton color={value}/>
    </ToolbarButtonStyle>
}

export default TextColorToolbarButton;
