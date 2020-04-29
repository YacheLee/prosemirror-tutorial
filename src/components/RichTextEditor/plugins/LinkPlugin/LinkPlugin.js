import {Plugin} from 'prosemirror-state';
import mark from './mark';
import {className} from './config';
import onLinkClick from './onLinkClick';

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
                        onLinkClick(hyperlinkElement);
                    }
                }
            }
        }
    });
}

export default LinkPlugin;
