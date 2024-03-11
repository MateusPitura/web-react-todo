import React, { useEffect, useState } from "react";
import { taskType } from "../../types/task.ts";
import { userType } from "../../types/user.ts";
import { getLocalItens, setLocalItens } from "../../controller/LocalStorage.tsx";
import { USER_LIST, USER_LOGGED } from "../../constantes.js";
import { toastSuccess } from "../../controller/Toast.tsx";
import { ToastContainer } from "react-toastify";

//components
import Form from "../../components/form/Form.tsx";
import Input from "../../components/input/Input.tsx";

const Home = () => {

    const [userTaks, setUserTasks] = useState<taskType[]>([])

    useEffect(()=>{
        const userLogged = getLocalItens(USER_LOGGED)
        setUserTasks(userLogged.tasks)
    }, [])

    const handleCriarNovaTarefa = (event: React.FormEvent<HTMLFormElement>) => {
        const newTask: taskType = {
            id: new Date().getTime(),
            title: event.target[0].value,
            description: event.target[1].value,
            createDate: new Date().toDateString(),
            status: false,
        }
        const userList = getLocalItens(USER_LIST)
        const userLogged = getLocalItens(USER_LOGGED)
        const userListUpdated = userList.map((item: userType) => {
            if(item.id === userLogged.id){
                item.tasks?.push(newTask)
                setUserTasks(item.tasks??[])
            }
            return item
        })
        setLocalItens(USER_LIST, userListUpdated)
        toastSuccess('Tarefa criada!')
    }

    return (
        <>
            <Form
                title={"Nova tarefa"}
                buttonMessage={"Criar"}
                onSubmit={handleCriarNovaTarefa}
            >
                <Input type="text" label="Título"/>
                <Input type="text" label="Descrição"/>
            </Form>
            <div>
                {
                    userTaks.map(item => 
                        <div key={item.id}>{item.title} - {item.description} - {item.createDate} - {item.status}</div>
                    )
                }
            </div>
            <ToastContainer/>
        </>
    )
}

export default Home