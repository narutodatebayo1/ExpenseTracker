import { redirect } from "next/navigation"
import { getUserByName, insertUser } from "../../../hook/userHook"
import { cookies } from "next/headers"
import AuthForm from "@/component/authForm"

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(userId != null) {
        redirect('/dashboard')
    }
    return userId
}

export default function Register(){

    const userId = getUserId()

    const register = async (name: string, password: string): Promise<string> => {
        "use server"

        const user = await getUserByName(name)

        if(user && user._id) {
            return "Name not available"
        } else {
            const newUser = await insertUser({
                name: name,
                password: password
            })
            redirect('/login')
        }
    }

    return <AuthForm formTitle="Register" buttonName="Register" submitFunction={register} formType="register" />
}