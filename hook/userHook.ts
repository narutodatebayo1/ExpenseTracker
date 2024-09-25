import { ICreateUser, IUpdateUser } from "../interface/userInterface"

export const getUserByName = async (name: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/user/${name}`)
    const data = await res.json()
    return data.data
}

export const getUserByUserId = async (id: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/user/id/${id}`)
    const data = await res.json()
    return data.data
}

export const insertUser = async (user: ICreateUser) => {
    const res = await fetch(`${process.env.BASE_URL}/api/user`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data
}

export const loginUser = async (user: ICreateUser) => {
    const res = await fetch(`${process.env.BASE_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user)
    })
    const data = await res.json()
    return data.data
}

export const updateUser = async (userId: string, newUser: IUpdateUser) => {
    const res = await fetch(`${process.env.BASE_URL}/api/user/id/${userId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser)
    })
    const data = await res.json()
    return data
}