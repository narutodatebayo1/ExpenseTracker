"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { IExpenseType } from "../../interface/expenseTypeInterface"
import { IBudget } from "../../interface/budgetInterface"
import styles from "@/style/budgetForm.module.css"

interface IBudgetForm {
    formTitle: string,
    buttonName: string,
    submitFunction: (expenseType: string, limit: string) => Promise<string>,
    formType: 'add' | 'edit',
    expenseTypesData: IExpenseType[],
    budget?: IBudget,
    expenseTypeId?: string,
    userId?: string
}

export default function BudgetForm({ formTitle, buttonName, submitFunction, formType, expenseTypesData, budget, expenseTypeId, userId }: IBudgetForm) {

    const [expenseType, SetExpenseType] = useState("")
    const [limit, SetLimit] = useState("")

    const [expenseTypeError, SetExpenseTypeError] = useState("")
    const [limitError, SetLimitError] = useState("")

    useEffect(() => {
        
        if(expenseTypeId) {
            SetExpenseType(expenseTypeId)
        } else if(budget) {
            SetExpenseType(budget.expenseType._id.toString())
            SetLimit(budget.limit.toString())
        }

    }, [])

    const formSubmit = async (e: FormEvent) => {
        e.preventDefault()

        expenseType == "" ? SetExpenseTypeError("Must be filled") : SetExpenseTypeError("")
        limit == "" ? SetLimitError("Must be filled") : SetLimitError("")

        if(expenseType != "" && limit != "") {

            const res = await submitFunction(expenseType, limit)

            if(res == "Budget already exist") {
                SetExpenseTypeError(res)
            }

        }
    }
    
    return (
        <form className={styles.form} onSubmit={formSubmit}>
            <h1>{formTitle}</h1>
            <div className={styles.inputDiv}>
                <select
                    value={expenseType}
                    disabled={formType == "edit"}
                    className={styles.expenseTypeDropDownList}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => SetExpenseType(e.target.value)}
                >
                    <option value="" hidden>Expense Type</option>
                    {expenseTypesData.map(expenseType => {
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
                    placeholder="Limit"
                    value={limit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => SetLimit(e.target.value)}
                />
                <p className={styles.errorMessage}>{limitError}</p>
            </div>

            <button type="submit" className={styles.submitButton}>{buttonName}</button>
        </form>
    )
}