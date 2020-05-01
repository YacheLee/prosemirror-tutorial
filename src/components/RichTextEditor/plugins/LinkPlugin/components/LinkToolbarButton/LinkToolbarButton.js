import React, {useState} from 'react';
import {MdInsertLink} from 'react-icons/md';
import ToolbarButtonStyle from '../../../shared/ToolbarButtonStyle';
import LinkEditPopover from '../LinkEditPopover';
import insertLink from './insertLink';
import {setPopoverAnchorElement, setPopoverContent} from '../../../../RichTextEditor';

function LinkToolbarButton({editorView, toolbarButtonDom}){
    const [open, setOpen] = useState(false);

    return <ToolbarButtonStyle onClick={event => {
        event.preventDefault();
        if(!open){
            setOpen(true);
            setPopoverAnchorElement(toolbarButtonDom);
            setPopoverContent(
                <LinkEditPopover onApply={({text, url}) => {
                    insertLink(editorView.state.selection.from, url, text)(editorView.state, editorView.dispatch);
                    setPopoverAnchorElement(null);
                    setOpen(false);
                }}/>);
        }
        else{
            setPopoverAnchorElement(null);
            setOpen(false);
        }
    }}>
        <MdInsertLink/>
    </ToolbarButtonStyle>
}

export default LinkToolbarButton;
