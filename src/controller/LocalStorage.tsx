export const saveLocalItens = (key: string, item: Object) => {
    const jsonData = getLocalItens(key)
    const newData = [...jsonData, item]
    localStorage.setItem(key, JSON.stringify(newData))
}

export const getLocalItens = (key: string) => {
    const stringData = localStorage.getItem(key)
    return stringData?JSON.parse(stringData):[]
}

export const setLocalItens = (key: string, item: string) => {
    localStorage.setItem(key, JSON.stringify(item))
}