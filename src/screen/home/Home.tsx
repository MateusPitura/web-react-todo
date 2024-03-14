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
import Card from "../../components/card/Card.tsx";

const Home = () => {

    const [userTaks, setUserTasks] = useState<taskType[]>([])
    const [userId, setUserId] = useState<number>()
    const [currentTaskId, setCurrentTaskId] = useState<number>()
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [taskTitle, setTaskTitle] = useState<string>()
    const [taskDescription, setTaskDescription] = useState<string>()
    const [isEditionModeEnable, setIsEditionModeEnable] = useState(false)

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

    const handleAbrirEditarTarefa = (id: number) => {
        setCurrentTaskId(id) //Esse id será usado ao submeter o formulário de edição
        retrieveTarefa(id) //Como tem um atraso ao setar o state, eu passo o ID como parâmetro ao invés de usar o state
        setIsEditionModeEnable(true)
        setModalIsOpen(true)
    }

    const handleSubmitEditarTarefa = (event: React.FormEvent<HTMLFormElement>) => {
        const userList = getLocalItens(USER_LIST)
        const userListUpdated = userList.map((item: userType) => {
            if (item.id === userId) {
                const taskUpdated = item.tasks?.map((element: taskType) => {
                    if (element.id === currentTaskId) {
                        element.title = event.target[0].value
                        element.description = event.target[1].value
                    }
                    return element
                })
                setUserTasks(taskUpdated ?? [])
            }
            return item
        })
        setLocalItens(USER_LIST, userListUpdated)
        toastSuccess("Tarefa atualizada")
        setModalIsOpen(false)
        setIsEditionModeEnable(false)
    }

    const handleSortByStatus = () => {
        const taskListSorted = [...userTaks]
        taskListSorted.sort(a => { //Ordena as tarefas, se for concluída (true) fica em baixa, se não fica em cima
            if (a.status === true ) {
                return -1 
            } else {
                return 1
            }
        })
        console.log(taskListSorted)
        setUserTasks(taskListSorted)
    }

    const handleSortByDate = () => {
        const taskListSorted = [...userTaks]
        taskListSorted.sort((a, b) => {
            const dateA = new Date(a.createDate)
            const dateB = new Date(a.createDate)
            console.log(dateA)
            console.log(dateB)
            if (dateA.getTime() - dateB.getTime()) {
                return 1 
            } else {
                return -1
            }
        })
        console.log(taskListSorted)
        setUserTasks(taskListSorted)
    }

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
            >
                {
                    isEditionModeEnable ?
                        <Form
                            title={"Editar tarefa"}
                            buttonMessage={"Editar"}
                            onSubmit={handleSubmitEditarTarefa}
                        >
                            <Input type="text" label="Título" value={taskTitle} onChange={setTaskTitle} />
                            <Input type="text" label="Descrição" value={taskDescription} onChange={setTaskDescription} />
                        </Form>
                        :
                        <Form
                            title={"Nova tarefa"}
                            buttonMessage={"Criar"}
                            onSubmit={handleCriarTarefa}
                        >
                            <Input type="text" label="Título" />
                            <Input type="text" label="Descrição" />
                        </Form>
                }
                <button onClick={() => {
                    setModalIsOpen(false)
                    setIsEditionModeEnable(false)
                }}>Fechar</button>
            </Modal>
            <div>
                <button onClick={() => setModalIsOpen(true)}>Criar tarefa</button>
                <button onClick={() => handleSortByStatus()}>Ordenar por status</button>
                <button onClick={() => handleSortByDate()}>Ordenar por prazo</button>
                {
                    userTaks.map(item =>
                        <Card
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            description={item.description}
                            createDate={item.createDate}
                            status={item.status}
                            onDelete={() => handleExcluirTarefa(item.id)}
                            onCompleting={() => handleConcluirTarefa(item.id)}
                            onEdit={() => handleAbrirEditarTarefa(item.id)}
                        />
                    )
                }
            </div>
            <ToastContainer />
        </>
    )
}

export default Home