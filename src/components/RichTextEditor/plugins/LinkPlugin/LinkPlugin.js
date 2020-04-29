import {Plugin} from 'prosemirror-state';
import mark from './mark';
import {className} from './config';
import onLinkClick from './onLinkClick';
import getActiveLinkMark from './getActiveLinkMark';

function LinkPlugin(){
    return new Plugin({
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
