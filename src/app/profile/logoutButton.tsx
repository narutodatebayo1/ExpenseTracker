"use client"

import { useRouter } from "next/navigation"
import { FiLogOut } from "react-icons/fi";
import styles from "../../style/profile.module.css"

export default function LogoutButton({ deleteCookie }: { deleteCookie: () => void }) {

    const router = useRouter()

    const buttonClicked = () => {
        deleteCookie()
    }

    return <div className={styles.profileSubPage} onClick={buttonClicked}>
        <div>
            <FiLogOut />
        </div>
        Logout
    </div>
}