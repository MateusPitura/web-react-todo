import React from "react";
import { USER_LIST } from "../../constantes.js";
import { ToastContainer } from "react-toastify";
import { toastError, toastSuccess } from "../../controller/Toast.tsx";
import { saveLocalItens, getLocalItens } from "../../controller/LocalStorage.tsx";
import { userType } from '../../types/user.ts'
import { useNavigate } from "react-router";

//components
import Input from "../../components/input/Input.tsx";
import Form from "../../components/form/Form.tsx"

const Cadastro = () => {

    const navigate = useNavigate()

    const validateDuplicatedUser = (email: string) => {
        const jsonData = getLocalItens(USER_LIST)
        const userSearched = jsonData.find((item: userType) =>
            item.email === email
        )
        if (!userSearched) {
            return true
        }
        return false
    }

    const createUser = (newUser: userType) => {
        if (!validateDuplicatedUser(newUser.email)) {
            toastError('Usuário já cadastrado')
            return -1
        }
        saveLocalItens(USER_LIST, newUser)
        toastSuccess('Usuário cadastrado')
        setTimeout(() => navigate("/login"), 1500)
    }

    const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
        const newUser = {
            id: new Date().getTime(),
            email: event.target[0].value,
            password: event.target[1].value,
            tasks: []
        }
        createUser(newUser)
    }

    return (
        <>
            <Form
                onSubmit={handleCreateUser}
                title={"Cadastro"}
                buttonMessage={"Cadastrar"}
            >
                <Input label="E-mail" type="email" />
                <Input label="Senha" type="password" />
            </Form>
            <ToastContainer />
        </>
    )
}

export default Cadastro