import React from "react";

const Form = ({children, onSubmit}) => {

    const onSubmitAux = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(event)
    }

    return (
        <form onSubmit={event => onSubmitAux(event)}>
            {children}
        </form>
    )
}

export default Form