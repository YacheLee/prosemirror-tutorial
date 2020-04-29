import React from 'react';
import styled from 'styled-components';
import {BLACK_COLOR, DEFAULT_FONT_SIZE, GREY_COLOR} from '../config';

const ToolbarActiveButtonStyle = styled.div`
    font-size: ${DEFAULT_FONT_SIZE};
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      background-color: ${(props) => (props.isActive ? BLACK_COLOR : 'white')};
      color: ${(props) => (props.isActive ? 'white' : BLACK_COLOR)};
      border-radius: 5px;
      
      &:hover{
          background-color: ${(props) => (props.isActive ? BLACK_COLOR : GREY_COLOR)};
          color: ${(props) => (props.isActive ? 'white' : BLACK_COLOR)};
      cursor: pointer;
       }
    }
`;

export default ToolbarActiveButtonStyle;
