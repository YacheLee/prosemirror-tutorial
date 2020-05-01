import React, {Fragment} from 'react';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function Popover({id, anchorEl, onClose, children}) {
    const open = Boolean(anchorEl);
    return <ClickAwayListener onClickAway={event=>{
        if(event.composedPath().indexOf(anchorEl)===-1){
            onClose(null);
        }
    }}>
        <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
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
