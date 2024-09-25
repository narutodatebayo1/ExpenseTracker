import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GoPerson } from "react-icons/go";
import { FaUserEdit } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";
import { MdChecklist } from "react-icons/md";
import { GrFlag } from "react-icons/gr";
import { FaHeadset } from "react-icons/fa";


import LogoutButton from "./logoutButton";
import Link from "next/link";
import styles from "../../style/profile.module.css"
import { getUserByUserId } from "../../../hook/userHook";

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(!userId) {
        redirect('/')
    }
    return userId
}

export default async function Profile() {

    const userId = getUserId()

    const user = await getUserByUserId(userId)

    const deleteCookie = async () => {
        "use server"
        cookies().delete("user_id")
    }

    return (
        <div className="page-with-navbar">
            <div className={styles.profile}>
                <div className={styles.profileIconDiv}>
                    <GoPerson />
                </div>
                <div className={styles.profileNameDiv}>
                    <p>{user.name}</p>
                </div>
            </div>

            <div className={styles.profileSubPageList}>
                Accounts
                <Link href="/profile/edit_profile" className={styles.profileSubPage}>
                    <div>
                        <FaUserEdit />
                    </div>
                    Edit Profile
                </Link>
                <hr />
                <Link href="/profile/expense" className={styles.profileSubPage}>
                    <div>
                        <BiDollar />
                    </div>
                    Expense
                </Link>
                <hr />
                <Link href="/profile/budget" className={styles.profileSubPage}>
                    <div>
                        <MdChecklist />
                    </div>
                    Budget
                </Link>
            </div>

            <div className={styles.profileSubPageList}>
                Others
                <Link href="/profile/help_center" className={styles.profileSubPage}>
                    <div>
                        <FaHeadset />
                    </div>
                    Help Center
                </Link>
                <hr />
                <Link href="/profile/report" className={styles.profileSubPage}>
                    <div>
                        <GrFlag />
                    </div>
                    Report a problem
                </Link>
                <hr />
                <LogoutButton deleteCookie={deleteCookie} />
            </div>
        </div>
    )
}