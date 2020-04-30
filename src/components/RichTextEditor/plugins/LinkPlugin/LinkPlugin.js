import React from 'react';
import {Plugin} from 'prosemirror-state';
import ReactDOM from 'react-dom';
import {MdInsertLink} from 'react-icons/md';

import mark from './mark';
import {className} from './config';
import onLinkClick from './onLinkClick';
import getActiveLinkMark from './getActiveLinkMark';

import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';
import onInsertLinkClick from './onInsertLinkClick';

class View{
    constructor(editorView) {
        this.dom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        ReactDOM.render(<ToolbarButtonStyle onClick={e=>{
            e.preventDefault();
            onInsertLinkClick(editorView, e.currentTarget);
        }}>
            <MdInsertLink />
        </ToolbarButtonStyle>, this.dom);
    }
    update(editorView){
        this.renderReactComponent(editorView);
    }
    destroy() { this.dom.remove() }
}

function LinkPlugin(toolbarDom){
    return new Plugin({
        view(editorView){
            const view = new View(editorView, toolbarDom);
            toolbarDom.append(view.dom);
            return view;
        },
        update(){
            return true;
        },
        mark,
        props: {
            handleClick: (editorView, _pos, event) =>{
                const {target} = event;
                if (target) {
                    const hyperlinkElement = target.closest(`.${className}`);
                    if(hyperlinkElement){
                        const mark = getActiveLinkMark(editorView.state);
                        if(mark){
                            onLinkClick(editorView, hyperlinkElement, mark);
                        }
                    }
                }
            }
        }
    });
}

export default LinkPlugin;
