import React from 'react';
import copy from 'copy-to-clipboard';
import LinkPopover from './components/LinkPopover';
import setLinkHref from './setLinkHref';
import LinkEditPopover from './components/LinkEditPopover';
import setLinkText from './setLinkText';
import {className, DIALOG_MOBILE_SIZE} from './config';
import getActiveLinkMark from './getActiveLinkMark';
import PopoverManager from '../../PopoverManager';

function onLinkClick(editorView, _pos, event){
    const {target} = event;
    if (target) {
        const hyperlinkElement = target.closest(`.${className}`);
        if(hyperlinkElement){
            const mark = getActiveLinkMark(editorView.state);
            if(mark){
                const url = hyperlinkElement.getAttribute('href');
                const text = hyperlinkElement.innerText;
                PopoverManager.setPopoverAnchorElement(hyperlinkElement);
                PopoverManager.setPopoverContent(<LinkPopover
                    url={url}
                    onEditLink={()=>{
                        if (window.screen.width > DIALOG_MOBILE_SIZE) {
                            PopoverManager.setPopoverContent(<LinkEditPopover
                                url={url}
                                text={text}
                                onApply={({text, url})=>{
                                    setLinkHref(url, mark.pos)(
                                        editorView.state,
                                        editorView.dispatch
                                    );
                                    setLinkText(text, mark.pos)(
                                        editorView.state,
                                        editorView.dispatch,
                                    );
                                    PopoverManager.closePopover();
                                }}
                            />);
                        }
                        else{
                            //mobile
                            const answered_url = window.prompt('Enter the URL of the link:', url);
                            if (answered_url){
                                setLinkHref(answered_url, mark.pos)(
                                    editorView.state,
                                    editorView.dispatch
                                );
                            }
                        }
                    }}
                    onCopyLink={()=>{
                        copy(url);
                        PopoverManager.closePopover();
                    }}
                    onRemoveLink={()=>{
                        setLinkHref('', mark.pos)(
                            editorView.state,
                            editorView.dispatch
                        );
                        PopoverManager.closePopover();
                    }}
                />);
            }
        }
    }
}

export default onLinkClick;
