import { cookies } from "next/headers";
import styles from "../style/page.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(userId != null) {
        redirect('/dashboard')
    }
    return userId
}

export default function Home() {

    const userId = getUserId()

    return (
        <div className={styles.buttonDiv}>
            <Link className={styles.link} href="/register">Register</Link>
            <Link className={styles.link} href="/login">Login</Link>
        </div>
    );
}