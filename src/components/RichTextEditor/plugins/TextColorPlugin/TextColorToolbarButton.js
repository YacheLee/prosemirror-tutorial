import React, {Fragment} from "react";
import Popover from '@material-ui/core/Popover';
import {CompactPicker} from 'react-color';
import {changeColor} from './commands';
import AButton from './AButton';

function TextColorToolbarButton({editorView, value}){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'text-color-popover' : undefined;

    return <Fragment>
        <AButton color={value} onClick={(e) => {
            e.preventDefault();
            editorView.focus();
            setAnchorEl(e.currentTarget);
        }}/>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
                setAnchorEl(null);
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
            <div onMouseDown={(e)=>{
                if(e.target.tagName !== 'INPUT'){
                    e.preventDefault();
                }
            }} >
                <CompactPicker color={value} onChangeComplete={({hex}, event) => {
                    if(hex){
                        changeColor(editorView, hex);
                        setAnchorEl(null);
                    }
                }} />
            </div>
        </Popover>
    </Fragment>
}

export default TextColorToolbarButton;
