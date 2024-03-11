import { taskType } from "./task"

export type userType = {
    id: number,
    email: string,
    password: string
    tasks?: taskType[]
}