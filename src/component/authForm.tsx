"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IUser } from "../../interface/userInterface"
import styles from "@/style/authForm.module.css"
import Link from "next/link"

interface IAuthForm {
    formTitle: string,
    buttonName: string,
    submitFunction: (name: string, password: string) => Promise<string>,
    formType?: 'register' | 'login',
    user?: IUser
}

export default function AuthForm({ formTitle, buttonName, submitFunction, formType, user }: IAuthForm) {

    const [name, SetName] = useState("")
    const [password, SetPassword] = useState("")

    const [nameError, SetNameError] = useState("")
    const [passwordError, SetPasswordError] = useState("")

    useEffect(() => {

        if(user) {
            SetName(user.name)
            SetPassword(user.password)
        }

    }, [])

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault()

        name == "" ? SetNameError("Must be filled") : SetNameError("")
        password == "" ? SetPasswordError("Must be filled") : SetPasswordError("")

        if(name != "" && password != "") {
            
            const res = await submitFunction(name, password)
            if(res == "Name not available") {
                SetNameError(res)
            } else if(res == "Name not found") {
                SetNameError(res)
            } else if(res == "Wrong Password") {
                SetPasswordError(res)
            }
        }
    }

    return (
        <form onSubmit={formSubmit} className={styles.form}>
            <h1>{formTitle}</h1>
            <div>
                <input
                    type="text"
                    value={name}
                    placeholder="Name"
                    className={styles.inputBox}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => SetName(e.target.value)}
                />
                <p className={styles.errorMessage}>{nameError}</p>
            </div>
            <div >
                <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    className={styles.inputBox}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => SetPassword(e.target.value)}
                />
                <p className={styles.errorMessage}>{passwordError}</p>
            </div>
            <button type="submit" className={styles.submitButton}>{buttonName}</button>
            {formType == "login" && <p>Dont have an account? <Link href="/register">Register Here!</Link></p>}
            {formType == "register" && <p>Already have an account? <Link href="/login">Login Here!</Link></p>}
        </form>
    )
}