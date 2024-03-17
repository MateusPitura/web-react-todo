import React from "react";
import { inputType } from '../../types/input'
import './Input.css'

const Input = (props: inputType) => {
    return (
        <div>
            <label className="Input">
                <div className="Input__label">{props.label}</div>
                <input
                    type={props.type}
                    value={props.value}
                    className="Input__input"
                    onChange={e =>
                        props.onChange ? //Se props.onChange existe
                            props.onChange!(e.target.value) //Executa
                            : (e) //Se não chama uma função que não faz nada
                    }
                />
            </label>
        </div>
    )
}

export default Input