import React, {Fragment} from 'react';
import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';
import {MdArrowDropDown} from 'react-icons/md';
import {BLACK_COLOR} from '../../config';
import getLabel from '../getLabel';
import ToolbarButtonStyle from '../../shared/ToolbarButtonStyle';
import HeadingList from './HeadingList';
import onHeadingClick from '../onHeadingClick';

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToolbarButton = styled(ToolbarButtonStyle)`
  color: ${BLACK_COLOR};
  margin-right: 0;
  min-width: 120px;
  font-size: 20px;
  &:hover{
    cursor: pointer;
  }
`;

function HeadingToolbarButton({editorView, value}) {
    const label = getLabel(value);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'heading-popover' : undefined;

    return (
        <Fragment>
            <ToolbarButton onClick={(e)=>{
                setAnchorEl(e.currentTarget);
            }}>
                <CenterBox>{label}</CenterBox>
                <CenterBox>
                    <MdArrowDropDown/>
                </CenterBox>
            </ToolbarButton>
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
        </Fragment>
    );
}

HeadingToolbarButton.defaultProps = {};

HeadingToolbarButton.propTypes = {};

export default HeadingToolbarButton;
