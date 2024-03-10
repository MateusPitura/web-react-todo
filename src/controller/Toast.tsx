import React from "react"
import { toast } from "react-toastify"

export const toastSuccess = (message: string) => {
    toast.success(message, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    })
}

export const toastError = (message: string) => {
    toast.error(message, {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    })
}