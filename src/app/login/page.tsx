import { cookies } from 'next/headers'
import { redirect } from "next/navigation";
import { getUserByName, loginUser } from "../../../hook/userHook";
import AuthForm from "@/component/authForm";

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(userId != null) {
        redirect('/dashboard')
    }
    return userId
}

export default async function Login() {

    const user_id = getUserId()

    const login = async (name: string, password: string): Promise<string> => {
        "use server"

        const user = await getUserByName(name)
        
        if(!user._id) {
            return "Name not found"
        } else {
            const userLogin = await loginUser({ 
                name: name,
                password: password
             })
            
            if(userLogin.length == 1) {
                cookies().set('user_id', userLogin[0]._id, {
                    httpOnly: true,
                    maxAge: 60 * 60, // One Hour
                    path: '/',
                })
                redirect("/dashboard")
            }

            return "Wrong Password" // success = false
        }
    }

    return <AuthForm formTitle="Login" buttonName="Login" submitFunction={login} formType="login" />
}