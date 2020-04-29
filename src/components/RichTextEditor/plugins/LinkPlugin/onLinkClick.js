import React from 'react';
import copy from 'copy-to-clipboard';
import {setPopoverAnchorElement, setPopoverContent} from '../../RichTextEditor';
import LinkPopover from './components/LinkPopover';
import setLinkHref from './setLinkHref';

function onLinkClick(editorView, hyperlinkElement, mark){
    const url = hyperlinkElement.getAttribute('href');
    setPopoverContent(<LinkPopover
        url={url}
        onCopyLink={()=>{
            copy(url);
            setPopoverAnchorElement(null);
        }}
        onRemoveLink={()=>{
            setLinkHref('', mark.pos)(
                editorView.state,
                editorView.dispatch
            );
            setPopoverAnchorElement(null);
        }}
    />);
    setPopoverAnchorElement(hyperlinkElement);
}

export default onLinkClick;
