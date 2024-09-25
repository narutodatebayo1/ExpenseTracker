import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUserByName, getUserByUserId, updateUser } from "../../../../hook/userHook"
import AuthForm from "@/component/authForm"
import BackNavbar from "@/component/backNavbar"

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(!userId) {
        redirect('/')
    }
    return userId
}

export default async function Page() {

    const userId = getUserId()

    const currentUser = await getUserByUserId(userId)

    const updateProfile = async (name: string, password: string): Promise<string> => {
        "use server"

        const user = await getUserByName(name)

        if(user._id && currentUser.name != user.name) {
            return "Name not available"
        } else {
            const res = await updateUser(userId, { name: name, password: password })
            
            if(res.success == true) {
                redirect('/profile')
            }
            return "Error"
        }
    }

    return (
        <>
            <BackNavbar text="My Profile" route="/profile" />
            <div className="page-with-navbar-backnavbar">
                <AuthForm formTitle="Edit Profile" buttonName="Update" submitFunction={updateProfile} user={currentUser} />
            </div>
        </>
    )
}