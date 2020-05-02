import React from 'react';
import {MdInsertLink} from 'react-icons/md';
import ToolbarButtonStyle from '../../../shared/ToolbarButtonStyle';
import LinkEditPopover from '../LinkEditPopover';
import insertLink from './insertLink';
import PopoverManager from '../../../../PopoverManager';

function LinkToolbarButton({editorView, toolbarButtonDom}){
    return <ToolbarButtonStyle onClick={event => {
        event.preventDefault();

        //toggle
        if(PopoverManager.getAnchorEl()===toolbarButtonDom){
            PopoverManager.closePopover();
        }
        else{
            PopoverManager.setPopoverAnchorElement(toolbarButtonDom);
            PopoverManager.setPopoverContent(
                <LinkEditPopover onApply={({text, url}) => {
                    insertLink(editorView.state.selection.from, url, text)(editorView.state, editorView.dispatch);
                    PopoverManager.closePopover();
                }}/>
            );
        }
    }}>
        <MdInsertLink/>
    </ToolbarButtonStyle>
}

export default LinkToolbarButton;
