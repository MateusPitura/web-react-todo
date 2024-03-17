import React from "react";
import './Form.css'

//Componentes
import Button from "../button/Button.tsx";

const Form = ({ children, onSubmit, title, buttonMessage }) => {

    const onSubmitAux = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(event)
    }

    return (
        <div className="Form">
            <span className="Form__title">{title}</span>
            <form className="Form__formulario" onSubmit={event => onSubmitAux(event)}>
                {children}
                <Button design={'primary'} type="submit">{buttonMessage}</Button>
            </form>
        </div>
    )
}

export default Form