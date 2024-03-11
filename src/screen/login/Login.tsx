import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_LIST, USER_LOGGED } from "../../constantes";
import { ToastContainer } from "react-toastify";
import { toastError } from '../../controller/Toast.tsx'
import { getLocalItens, setLocalItens } from '../../controller/LocalStorage.tsx'
import { userType } from '../../types/user.ts'

//components
import Input from "../../components/input/Input.tsx";
import Form from "../../components/form/Form.tsx";

const Login = () => {

    const navigate = useNavigate()

    const validateLoginUser = (email: string, password: string) => {
        const userList = getLocalItens(USER_LIST)
        const userLogged = userList?.find((item: userType) =>
            item.email === email && item.password === password
        )
        if (userLogged) {
            navigate("/")
            return userLogged
        }
        toastError("Usuário ou senha inválidos")
        return -1
    }

    const handleLoginUser = (event: React.FormEvent<HTMLFormElement>) => {
        const newUser = {
            email: event.target[0].value,
            password: event.target[1].value
        }
        const userLogged = validateLoginUser(newUser.email, newUser.password)
        setLocalItens(USER_LOGGED, userLogged)
    }

    return (
        <>
            <Form
                onSubmit={handleLoginUser}
                title={"Login"}
                buttonMessage={"Entrar"}
            >
                <Input label="E-mail" type="email" />
                <Input label="Senha" type="password" />
            </Form>
            <button onClick={() => navigate("/cadastro")}>
                Não tenho cadastro
            </button>
            <ToastContainer />
        </>
    )
}

export default Login