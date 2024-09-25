"use client"

import { IoIosArrowBack } from "react-icons/io";
import "../style/backNavbar.css"
import { useRouter } from "next/navigation";

export default function BackNavbar({ text, route }: { text: string, route: string }) {

    const router = useRouter()

    return (
        <nav className="back-navbar">
            <div className="icon-div" onClick={() => router.push(route)}>
                <IoIosArrowBack />
            </div>
            <div>
                {text}
            </div>
        </nav>
    )
}