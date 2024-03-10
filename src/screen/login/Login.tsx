import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_LIST } from "../../constantes";
import { ToastContainer } from "react-toastify";
import { toastError } from '../../controller/Toast.tsx'
import { getLocalItens } from '../../controller/LocalStorage.tsx'
import { userType } from '../../types/user.ts'

//components
import Input from "../../components/input/Input.tsx";
import Form from "../../components/form/Form.tsx";

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
        let userEmail = event.target[0].value
        let userPassword = event.target[1].value
        validateLoginUser(userEmail, userPassword)
    }

    return (
        <>
            <Form onSubmit={handleLoginUser}>
                <Input label="E-mail" type="email" />
                <Input label="Senha" type="password" />
                <button type="submit">Entrar</button>
            </Form>
            <button onClick={() => navigate("/cadastro")}>
                Não tenho cadastro
            </button>
            <ToastContainer />
        </>
    )
}

export default Login