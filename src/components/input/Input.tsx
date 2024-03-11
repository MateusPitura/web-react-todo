import React from "react";
import { inputType } from '../../types/input'

const Input = (props: inputType) => {
    return (
        <label>
            {props.label}
            <input type={props.type} value={props.value} onChange={e=>props.onChange!(e.target.value)}/>
        </label>
    )
}

export default Input