import React, {Fragment, useEffect} from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {closePopover, isTopPopover} from '../../RichTextEditor';

function Popover({id, anchorEl, children}) {
    const open = Boolean(anchorEl);

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


    return <ClickAwayListener onClickAway={event=>{
        if(event.composedPath().indexOf(anchorEl)===-1){
            closePopover();
        }
    }}>
        <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={closePopover}
        >
            <Fragment>
                {children}
            </Fragment>
        </Popper>
    </ClickAwayListener>
}

Popover.propTypes = {

};

export default Popover;
