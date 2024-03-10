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
        const userSearched = jsonData.map((item: userType) => {
            if(item.email === email){
                return item
            }
        })
        if(!userSearched[0]){
            return true
        }
        return false
    }

    const createUser = (newUser: userType) => {
        if(!validateDuplicatedUser(newUser.email)){
            toastError('Usuário já cadastrado')
            return -1
        }
        saveLocalItens(USER_LIST, newUser)
        toastSuccess('Usuário cadastrado')
        setTimeout(()=> navigate("/login"), 1500)
    }

    const handleCreateUser = (event: React.FormEvent<HTMLFormElement>) => {
        const newUser = {
            email: event.target[0].value,
            password: event.target[1].value
        }
        createUser(newUser)
    }

    return (
        <>
            <Form onSubmit={handleCreateUser}>
                <Input label="E-mail" type="email" />
                <Input label="Senha" type="password" />
                <button type="submit">Cadastrar</button>
            </Form>
            <ToastContainer/>
        </>
    )
}

export default Cadastro