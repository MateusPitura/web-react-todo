import React, { useEffect, useState } from "react";
import { taskType } from "../../types/task.ts";
import { userType } from "../../types/user.ts";
import { getLocalItens, setLocalItens } from "../../controller/LocalStorage.tsx";
import { USER_LIST, USER_LOGGED } from "../../constantes.js";
import { toastSuccess } from "../../controller/Toast.tsx";
import { ToastContainer } from "react-toastify";
import Modal from 'react-modal';

//components
import Form from "../../components/form/Form.tsx";
import Input from "../../components/input/Input.tsx";

const Home = () => {

    const [userTaks, setUserTasks] = useState<taskType[]>([])
    const [userId, setUserId] = useState<number>()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [taskTitle, setTaskTitle] = useState<string>()
    const [taskDescription, setTaskDescription] = useState<string>()

    useEffect(() => {
        const userLogged = getLocalItens(USER_LOGGED)
        const userList = getLocalItens(USER_LIST)
        const userSearched = userList.find((item: userType) => item.id === userLogged.id)
        setUserTasks(userSearched.tasks)
        setUserId(userLogged.id)
    }, [])

    const handleCriarTarefa = (event: React.FormEvent<HTMLFormElement>) => {
        const newTask: taskType = {
            id: new Date().getTime(),
            title: event.target[0].value,
            description: event.target[1].value,
            createDate: new Date().toDateString(),
            status: false,
        }
        const userList = getLocalItens(USER_LIST)
        const userListUpdated = userList.map((item: userType) => {
            if (item.id === userId) {
                item.tasks?.push(newTask)
                setUserTasks(item.tasks ?? [])
            }
            return item
        })
        setLocalItens(USER_LIST, userListUpdated)
    }

    const handleConcluirTarefa = (id: number) => {
        const userList = getLocalItens(USER_LIST)
        const userListUpdated = userList.map((item: userType) => {
            if (item.id === userId) {
                const tasksUpdated = item.tasks?.map(element => {
                    if (element.id === id) {
                        element.status = !element.status
                    }
                    return element
                })
                setUserTasks(tasksUpdated ?? [])
            }
            return item
        })
        setLocalItens(USER_LIST, userListUpdated)
    }

    const handleExcluirTarefa = (id: number) => {
        const userList = getLocalItens(USER_LIST)
        const userListUpdated = userList.map((item: userType) => {
            if (item.id === userId) {
                const taskSearched = item.tasks?.find(element => element.id === id)
                const taskIndex = item.tasks?.indexOf(taskSearched!)
                item.tasks?.splice(taskIndex!, 1)
                setUserTasks(item.tasks ?? [])
            }
            return item
        })
        setLocalItens(USER_LIST, userListUpdated)
    }

    const retrieveTarefa = (id: number) => {
        const userList = getLocalItens(USER_LIST)
        const userSearched = userList.find((item: userType) => item.id === userId)
        const taskSearched = userSearched.tasks?.find((element: taskType) => element.id === id)
        setTaskTitle(taskSearched?.title)   
        setTaskDescription(taskSearched?.description)   
    }

    const handleEditarTarefa = (id: number) => {
        retrieveTarefa(id)
        setModalIsOpen(true)
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
            >
                <Form
                    title={"Nova tarefa"}
                    buttonMessage={"Criar"}
                    onSubmit={handleCriarTarefa}
                >
                    <Input type="text" label="Título" value={taskTitle} onChange={setTaskTitle}/>
                    <Input type="text" label="Descrição" value={taskDescription} onChange={setTaskDescription}/>
                </Form>
                <button onClick={()=>setModalIsOpen(false)}>Fechar</button>
            </Modal>
            <div>
                <button onClick={()=>setModalIsOpen(true)}>Criar tarefa</button>
                {
                    userTaks.map(item =>
                        <div key={item.id}>
                            <div>
                                - {item.title}
                                - {item.description}
                                - {item.createDate}
                                - {item.status ? 'Concluída' : 'Pendente'}
                            </div>
                            <button onClick={() => handleExcluirTarefa(item.id)}>Excluir</button>
                            <button onClick={() => handleConcluirTarefa(item.id)}>Concluir</button>
                            <button onClick={() => handleEditarTarefa(item.id)}>Editar</button>
                        </div>
                    )
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default Home