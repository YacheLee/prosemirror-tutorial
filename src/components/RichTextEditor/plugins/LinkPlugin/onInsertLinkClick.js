import React from 'react';
import {setPopoverAnchorElement, setPopoverContent} from '../../RichTextEditor';
import LinkEditPopover from './components/LinkEditPopover';
import insertLink from './insertLink';

function onInsertLinkClick(editorView, element){
    setPopoverAnchorElement(element);
    setPopoverContent(<LinkEditPopover onApply={({text, url})=>{
        const {state, dispatch} = editorView;
        insertLink(state.selection.from, url, text)(state, dispatch);
        editorView.focus();
        setPopoverAnchorElement(null);
    }} />);
}

export default onInsertLinkClick;
