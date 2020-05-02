import React from 'react';
import {MdInsertLink} from 'react-icons/md';
import ToolbarButtonStyle from '../../../shared/ToolbarButtonStyle';
import LinkEditPopover from '../LinkEditPopover';
import insertLink from './insertLink';
import PopoverManager from '../../../../PopoverManager';
import setLinkHref from '../../setLinkHref';

function getSelectedText(state, from, to) {
    const selectedNode = state.doc.cut(from, to);
    const selectedFragment = selectedNode.content;

    return selectedFragment.content.map(e=>e.textContent).join("");
}

function LinkToolbarButton({editorView, toolbarButtonDom}){
    return <ToolbarButtonStyle onClick={event => {
        event.preventDefault();

        //toggle
        if(PopoverManager.getAnchorEl()===toolbarButtonDom){
            PopoverManager.closePopover();
        }
        else{
            let text = "";
            const {from, to} = editorView.state.selection;
            const isInsertMode = from === to;
            if(!isInsertMode){
                text = getSelectedText(editorView.state, from, to);
            }

            PopoverManager.setPopoverAnchorElement(toolbarButtonDom);
            PopoverManager.setPopoverContent(
                <LinkEditPopover
                    text={text}
                    onApply={({text, url}) => {
                    if(isInsertMode){
                        insertLink(from, url, text)(editorView.state, editorView.dispatch);
                    }
                    else{
                        setLinkHref(url, from ,to)(editorView.state, editorView.dispatch);
                    }
                    PopoverManager.closePopover();
                }}/>
            );
        }
    }}>
        <MdInsertLink/>
    </ToolbarButtonStyle>
}

export default LinkToolbarButton;
