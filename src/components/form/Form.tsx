import React from "react";

const Form = ({ children, onSubmit, title, buttonMessage }) => {

    const onSubmitAux = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(event)
    }

    return (
        <>
            <span>{title}</span>
            <form onSubmit={event => onSubmitAux(event)}>
                {children}
                <button type="submit">{buttonMessage}</button>
            </form>
        </>
    )
}

export default Form