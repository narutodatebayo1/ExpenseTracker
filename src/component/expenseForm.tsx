"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Inter } from "next/font/google";
import { IExpense } from "../../interface/expenseInterface";
import { IExpenseType } from "../../interface/expenseTypeInterface";
import { IBudget } from "../../interface/budgetInterface";
import { getExpenseByUserIdExpenseTypeIdDateRangeClient } from "../../hook/expenseHook";
import styles from "@/style/expenseForm.module.css"

const inter = Inter({ subsets: ["latin"], display: "swap" });

interface IExpenseForm {
    formTitle: string,
    buttonName: string,
    submitFunction: (expenseTypeId: string, amount: string, description: string) => Promise<string>,
    expenseTypesData: IExpenseType[]
    formType: 'add' | 'edit',
    expense?: IExpense,
    budgets?: IBudget[],
    userId?: string
}

function moneyFormat(num: number) {
    let rupiahFormat = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    }).format(num);
    return rupiahFormat
}

function getFirstDayLastDayThisMonth() {
    const current = new Date()

    const firstDayObject = new Date(
        Date.UTC(
            current.getFullYear(),
            current.getMonth(),
        )
    )

    const lastDayObject = new Date(
        Date.UTC(
            current.getFullYear(),
            current.getMonth() + 1,
            0,
            23,
            59,
            59,
            999
        )
    )

    const firstDay = firstDayObject.toISOString()
    const lastDay = lastDayObject.toISOString()

    return { firstDay, lastDay }
}

export default function ExpenseForm({ formTitle, buttonName, submitFunction, expenseTypesData, formType, expense, budgets, userId }: IExpenseForm) {

    const [expenseType, SetExpenseType] = useState("")
    const [amount, SetAmount] = useState("")
    const [description, SetDescription] = useState("")

    const [expenseTypeError, SetExpenseTypeError] = useState("")
    const [amountError, SetAmountError] = useState("")

    useEffect(() => {

        if(expense) {
            SetExpenseType(expense.expenseType._id.toString())
            SetAmount(expense.amount.toString())
            SetDescription(expense.description)
        }

    }, [])

    // hanya bisa dilakukan jika formType == 'add'
    const expenseTypeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        SetExpenseType(e.target.value)

        const budgetforExpenseType = budgets!.find(budget => budget.expenseType._id.toString() == e.target.value)
        
        if(budgetforExpenseType != undefined) {

            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const { firstDay, lastDay } = getFirstDayLastDayThisMonth()

            const expenses = await getExpenseByUserIdExpenseTypeIdDateRangeClient(userId!, e.target.value, firstDay, lastDay, timezone)
            
            if(expenses.totalAmount >= 3/4 * budgetforExpenseType.limit) {
                SetExpenseTypeError(`${moneyFormat(expenses.totalAmount)}/${moneyFormat(budgetforExpenseType.limit)}`)
            } else {
                SetExpenseTypeError("")
            }

        } else {
            SetExpenseTypeError("")
        }
    }

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault()

        expenseType == "" ? SetExpenseTypeError("Must be filled") : SetExpenseTypeError("")
        amount == "" ? SetAmountError("Must be filled") : SetAmountError("")

        if(expenseType != "" && amount != "") {

            const res = await submitFunction(expenseType, amount, description)

        }
    }

    return (
        <form onSubmit={formSubmit} className={styles.form}>
            <h1>{formTitle}</h1>
            <div className={styles.inputDiv}>
                <select
                    value={expenseType}
                    onChange={expenseTypeChange}
                    disabled={formType == "edit"}
                    className={styles.expenseTypeDropDownList}
                >
                    <option value="" hidden>Category</option>
                    {expenseTypesData.map((expenseType) => {
                        return (
                            <option key={expenseType._id.toString()} value={expenseType._id.toString()}>
                                {expenseType.title}
                            </option>
                        )
                    })}
                </select>
                <p className={styles.errorMessage}>{expenseTypeError}</p>
            </div>

            <div className={styles.inputDiv}>
                <input
                    type="number"
                    value={amount}
                    placeholder="Amount"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => SetAmount(e.target.value)}
                />
                <p className={styles.errorMessage}>{amountError}</p>
            </div>

            <textarea
                rows={5}
                spellCheck={false}
                value={description}
                placeholder="Description"
                className={inter.className}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => SetDescription(e.target.value)}
            ></textarea>

            <button type="submit" className={styles.submitButton}>{buttonName}</button>
        </form>
    )
}