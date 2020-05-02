import React from 'react';
import {MdInsertLink} from 'react-icons/md';
import ToolbarButtonStyle from '../../../shared/ToolbarButtonStyle';
import LinkEditPopover from '../LinkEditPopover';
import insertLink from './insertLink';
import {closePopover, getPopoverElement, setPopoverAnchorElement, setPopoverContent} from '../../../../RichTextEditor';

function LinkToolbarButton({editorView, toolbarButtonDom}){
    return <ToolbarButtonStyle onClick={event => {
        event.preventDefault();

        //toggle
        if(getPopoverElement()===toolbarButtonDom){
            closePopover();
        }
        else{
            setPopoverAnchorElement(toolbarButtonDom);
            setPopoverContent(
                <LinkEditPopover onApply={({text, url}) => {
                    insertLink(editorView.state.selection.from, url, text)(editorView.state, editorView.dispatch);
                    closePopover();
                }}/>
            );
        }
    }}>
        <MdInsertLink/>
    </ToolbarButtonStyle>
}

export default LinkToolbarButton;
