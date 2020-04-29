import React from 'react';
import styled from 'styled-components';

const ToolbarButtonStyle = function({component, ...props}){
    const Component = styled(component)`
        font-size: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-pack: center;
        box-align: center;
        width: auto;
        margin: 12px;
        color: ${(props) => props.disabled ? 'rgba(0, 0, 0, 0.26)' : 'rgba(0, 0, 0, 0.54)'};
        &:hover {
            cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
        }
    `;

    return <Component {...props} />
}

export default ToolbarButtonStyle;
