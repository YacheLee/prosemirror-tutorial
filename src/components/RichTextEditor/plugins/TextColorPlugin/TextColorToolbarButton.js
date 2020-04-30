import React from "react";
import Popover from '@material-ui/core/Popover';
import {CompactPicker} from 'react-color';
import {changeColor} from './commands';
import AButton from './AButton';
import ToolbarButtonStyle from '../shared/ToolbarButtonStyle';

function TextColorToolbarButton({editorView, value}){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'text-color-popover' : undefined;

    return <ToolbarButtonStyle onMouseDown={(e)=>{
        if(e.target.tagName!=='INPUT'){
            e.preventDefault();
        }
    }}>
        <AButton color={value} onClick={e => setAnchorEl(e.currentTarget)}/>
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
            <CompactPicker color={value} onChangeComplete={({hex}) => {
                if(hex){
                    changeColor(editorView, hex);
                    setAnchorEl(null);
                }
            }} />
        </Popover>
    </ToolbarButtonStyle>
}

export default TextColorToolbarButton;
