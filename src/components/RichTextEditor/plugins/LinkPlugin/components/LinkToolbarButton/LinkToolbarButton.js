import React from 'react';
import {MdInsertLink} from 'react-icons/md';
import ToolbarButtonStyle from '../../../shared/ToolbarButtonStyle';
import LinkEditPopover from '../LinkEditPopover';
import insertLink from './insertLink';
import {setPopoverAnchorElement, setPopoverContent} from '../../../../RichTextEditor';

function LinkToolbarButton({editorView}){
    return <ToolbarButtonStyle onClick={event => {
        setPopoverContent(
            <LinkEditPopover onApply={({text, url}) => {
                insertLink(editorView.state.selection.from, url, text)(editorView.state, editorView.dispatch);
                setPopoverAnchorElement(null);
            }}/>);
        setPopoverAnchorElement(event.currentTarget);
    }}>
        <MdInsertLink/>
    </ToolbarButtonStyle>
}

export default LinkToolbarButton;
