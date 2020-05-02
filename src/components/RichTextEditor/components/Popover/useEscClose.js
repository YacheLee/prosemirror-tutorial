import {useEffect} from 'react';
import {closePopover, isTopPopover} from '../../RichTextEditor';

function useEscClose(){
    useEffect(() => {
        function onKeyDown(event){
            if (event.key === 'Escape' && isTopPopover()) {
                closePopover();
            }
        }

        document.body.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.removeEventListener('keydown', onKeyDown);
        };
    });
}

export default useEscClose;
