import { cookies } from "next/headers"
import Navbar from "@/component/navbar"
import { insertExpense } from "../../../hook/expenseHook"
import { redirect } from "next/navigation"
import { getBudgetByUserId } from "../../../hook/budgetHook"
import { getExpenseTypes } from "../../../hook/expenseTypeHook"
import ExpenseForm from "@/component/expenseForm"

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(!userId) {
        redirect('/')
    }
    return userId
}

export default async function addExpense(){

    const userId = getUserId()

    const addExpense = async (expenseType: string, amount: string, description: string): Promise<string> => {
        "use server"

        const res = await insertExpense({
            expenseType: expenseType,
            user: userId,
            amount: Number(amount),
            description: description
        })
        
        redirect('/dashboard')
    }

    const budgetData = await getBudgetByUserId(userId)

    const expenseTypes = await getExpenseTypes()

    return (
        <>
            <div className="page-with-navbar">
                <ExpenseForm formTitle="Add Expense" buttonName="Add" submitFunction={addExpense} expenseTypesData={expenseTypes} formType="add" budgets={budgetData.budgets} userId={userId} />
            </div>
            <Navbar />
        </>
    )
}