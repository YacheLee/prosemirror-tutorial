import React from 'react';
import copy from 'copy-to-clipboard';
import {setPopoverAnchorElement, setPopoverContent} from '../../RichTextEditor';
import LinkPopover from './components/LinkPopover';
import setLinkHref from './setLinkHref';
import LinkEditPopover from './components/LinkEditPopover';

function onLinkClick(editorView, hyperlinkElement, mark){
    const url = hyperlinkElement.getAttribute('href');
    const text = hyperlinkElement.innerText;

    setPopoverContent(<LinkPopover
        url={url}
        onEditLink={()=>{
            setPopoverContent(<LinkEditPopover
                url={url}
                text={text}
                onApply={({text, url})=>{
                    setLinkHref(url, mark.pos)(
                        editorView.state,
                        editorView.dispatch
                    );
                    setPopoverAnchorElement(null);
                }}
            />);
        }}
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
