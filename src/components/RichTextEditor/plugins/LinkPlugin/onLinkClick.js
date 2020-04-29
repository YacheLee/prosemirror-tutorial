import React from 'react';
import {setPopoverAnchorElement, setPopoverContent} from '../../RichTextEditor';
import LinkPopover from './components/LinkPopover';
import setLinkHref from './setLinkHref';

function onLinkClick(editorView, hyperlinkElement, mark){
    const url = hyperlinkElement.getAttribute('href');
    setPopoverContent(<LinkPopover
        url={url}
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
