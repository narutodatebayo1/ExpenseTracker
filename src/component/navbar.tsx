"use client"

import { IoHomeOutline } from "react-icons/io5";
import { AiFillPlusCircle } from "react-icons/ai";
import { RxPerson } from "react-icons/rx";

import Link from "next/link";
import "../style/navbar.css"
import { usePathname } from "next/navigation";

export default function Navbar() {

    const pathname = usePathname()

    return (
        <nav className="navbar">
            <Link href="/dashboard" className={pathname == "/dashboard" ? "iconDiv currentPath" : "iconDiv"}>
                <IoHomeOutline />
            </Link>
            <Link href="/add_expense" className="iconDiv plusIcon">
                <AiFillPlusCircle />
            </Link>
            <Link href="/profile" className={pathname.startsWith("/profile") ? "iconDiv currentPath" : "iconDiv"}>
                <RxPerson />
            </Link>
        </nav>
    )
}