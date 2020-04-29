import React from 'react';
import styled from 'styled-components';
import {MdArrowDropDown} from 'react-icons/md';
import {BLACK_COLOR} from '../../config';
import getLabel from '../getLabel';

const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Root = styled(CenterBox)`
  color: ${BLACK_COLOR};
  font-size: 20px;
  &:hover{
    cursor: pointer;
  }
`;

function HeadingButton({value, onClick}) {
    const label = getLabel(value);

    return (
        <Root onClick={onClick}>
            <CenterBox>{label}</CenterBox>
            <CenterBox>
                <MdArrowDropDown/>
            </CenterBox>
        </Root>
    );
}

HeadingButton.defaultProps = {};

HeadingButton.propTypes = {};

export default HeadingButton;
