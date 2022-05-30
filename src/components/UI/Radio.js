import React from "react";

const Radio = (props) => {
    return(
        <React.Fragment>
            <input type="radio" id={props.id} name={props.groupName} value={props.id} disabled={props.disabled} checked={props.active===props.id} onClick={() => props.clicked(props.id)}/>
            <label htmlFor={props.id}>{props.text}</label>
        </React.Fragment>
    );
}

export default Radio;