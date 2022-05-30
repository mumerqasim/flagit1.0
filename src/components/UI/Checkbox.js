import React from "react";

const Checkbox = (props) => {
    return(
    <React.Fragment>
            <input type="checkbox" id={props.id} name={props.id} value={props.id} checked={props.checked} disabled={props.disabled} onChange={() => props.clicked(props.id)}/>
            <label htmlFor={props.id}>{props.text}</label>
    </React.Fragment>
    );
}

export default Checkbox;