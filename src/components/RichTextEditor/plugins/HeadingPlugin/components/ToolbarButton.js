import React from 'react';
import Popover from '@material-ui/core/Popover';
import HeadingToolbarButton from './HeadingToolbarButton';
import ToolbarButtonStyle from '../../shared/ToolbarButtonStyle';
import HeadingList from './HeadingList';
import onHeadingClick from '../onHeadingClick';

function ToolbarButton({editorView, value}){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'heading-popover' : undefined;

    return <ToolbarButtonStyle style={{marginRight: 0}}>
        <HeadingToolbarButton
            value={value}
            onClick={({ currentTarget }) => {
                setAnchorEl(currentTarget);
            }}
        />
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
            <HeadingList onClick={(level)=>{
                onHeadingClick(editorView, level);
                setAnchorEl(null);
            }} />
        </Popover>
    </ToolbarButtonStyle>
}

export default ToolbarButton;
