import React from 'react';
import {Plugin} from 'prosemirror-state';
import ReactDOM from 'react-dom';

import mark from './mark';
import {className} from './config';
import onLinkClick from './onLinkClick';
import getActiveLinkMark from './getActiveLinkMark';

import './LinkPlugin.css';
import LinkToolbarButton from './components/LinkToolbarButton';

class View{
    constructor(editorView) {
        this.dom = document.createElement('div');
        this.renderReactComponent(editorView);
    }
    renderReactComponent(editorView){
        ReactDOM.render(<LinkToolbarButton editorView={editorView} />, this.dom);
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
