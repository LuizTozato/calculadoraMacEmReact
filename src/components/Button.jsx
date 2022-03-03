import React from "react";
import './Button.css'

export default props => {
    
    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double    ? 'double'    : ''
    classes += props.triple    ? 'triple'    : ''

    return (
        <button 
            onClick={e => props.click && props.click(props.label)}/*O label já é a operação que será realizada*/
            className={classes}>
                {props.label}
        </button>
    )
}
    