import React from 'react';
import {setPopoverAnchorElement, setPopoverContent} from '../../RichTextEditor';
import LinkPopover from './components/LinkPopover';

function onLinkClick(hyperlinkElement){
    const url = hyperlinkElement.getAttribute('href');
    setPopoverContent(<LinkPopover url={url} />);
    setPopoverAnchorElement(hyperlinkElement);
}

export default onLinkClick;
