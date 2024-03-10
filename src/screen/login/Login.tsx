import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_LIST } from "../../constantes";
import { ToastContainer } from "react-toastify";
import { toastError } from '../../controller/Toast.tsx'
import { getLocalItens } from '../../controller/LocalStorage.tsx'

type userType = {
    email: string,
    password: string
}

const Login = () => {

    const navigate = useNavigate()

    const validateLoginUser = (email: string, password: string) => {
        const userList = getLocalItens(USER_LIST)
        const userLogged = userList?.map((item: userType) => {
            if (item.email === email && item.password === password) {
                return item
            }
        })
        if (userLogged[0]) {
            navigate("/")
        } else {
            toastError("Usuário ou senha inválidos")
        }
    }

    const handleLoginUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let userEmail = event.target[0].value
        let userPassword = event.target[1].value
        validateLoginUser(userEmail, userPassword)
    }

    return (
        <>
            <form onSubmit={event => handleLoginUser(event)}>
                <label>
                    E-mail
                    <input type="email" required/>
                </label>
                <label>
                    Senha
                    <input type="password" required/>
                </label>
                <button type="submit">Entrar</button>
            </form>
            <button onClick={() => navigate("/cadastro")}>
                Criar cadastro
            </button>
            <ToastContainer />
        </>
    )
}

export default Login