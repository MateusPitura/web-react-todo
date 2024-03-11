import React from "react";

const Input = ({ label, type }) => {
    return (
        <label>
            {label}
            <input type={type} />
        </label>
    )
}

export default Input