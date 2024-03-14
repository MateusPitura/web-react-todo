import React from "react";
import { inputType } from '../../types/input'

const Input = (props: inputType) => {
    return (
        <label>
            {props.label}
            <input
                type={props.type}
                value={props.value}
                onChange={e =>
                    props.onChange? //Se props.onChange existe
                    props.onChange!(e.target.value) //Executa
                    :(e) //Se não chama uma função que não faz nada
                }
            />
        </label>
    )
}

export default Input