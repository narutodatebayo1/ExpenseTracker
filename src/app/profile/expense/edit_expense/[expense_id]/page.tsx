import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getExpenseByExpenseId, updateExpense } from "../../../../../../hook/expenseHook"
import BackNavbar from "@/component/backNavbar"
import { getExpenseTypes } from "../../../../../../hook/expenseTypeHook"
import ExpenseForm from "@/component/expenseForm"

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(!userId) {
        redirect('/')
    }
    return userId
}

export default async function EditExpense({ params }: { params: { expense_id: string } }) {

    const userId = getUserId()

    const expenseTypes = await getExpenseTypes()

    const expenseId = params.expense_id

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    const expense = await getExpenseByExpenseId(expenseId, timezone)

    const editExpense = async (expenseType: string, amount: string, description: string): Promise<string> => {
        "use server"

        const res = await updateExpense(expenseId, {
            expenseType: expenseType,
            amount: Number(amount),
            description: description
        })
        
        redirect(`/profile/expense?expense_id=${expenseId}`)
    }

    return (
        <>
            <BackNavbar text="Edit Expense" route="/profile/expense" />
            <div className="page-with-navbar-backnavbar">
                <ExpenseForm formTitle="Edit Expense" buttonName="Edit" submitFunction={editExpense} expenseTypesData={expenseTypes} formType="edit" expense={expense} />
            </div>
        </>
    )
}