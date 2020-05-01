import React, {useState} from "react";
import {CompactPicker} from 'react-color';
import {changeColor} from './commands';
import AButton from './AButton';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';
import {setPopoverAnchorElement, setPopoverContent} from '../../RichTextEditor';

function TextColorToolbarButton({editorView, value}) {
    const [open, setOpen] = useState(false);

    return <ToolbarButtonStyle onClick={event => {
        if (!open) {
            setOpen(true);
            setPopoverAnchorElement(event.target);
            setPopoverContent(
                <CompactPicker color={value} onChangeComplete={({hex}) => {
                    if(hex){
                        changeColor(editorView, hex);
                        setPopoverAnchorElement(null);
                    }
                }} />
            );
        } else {
            setPopoverAnchorElement(null);
            setOpen(false);
        }
    }}>
        <AButton color={value}/>
    </ToolbarButtonStyle>
}

export default TextColorToolbarButton;
