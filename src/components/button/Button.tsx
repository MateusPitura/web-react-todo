import React from "react";
import "./Button.css"
import { buttonType } from "../../types/button";

const Button = (props: buttonType) => {

    return (
        <div className="Button">
            <button
                type={props.type}
                className={
                    props.design == "primary"
                        ?
                        "Button__primary"
                        :
                        props.design == "secondary" ?
                            "Button__secondary"
                            :
                            "Button__tertiary"
                }
                onClick={props.onClick}
            >
                {props.children}
            </button>
        </div>
    )
}

export default Button