import BackNavbar from "@/component/backNavbar"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getBudgetById, updateBudget } from "../../../../../../hook/budgetHook"
import { getExpenseTypes } from "../../../../../../hook/expenseTypeHook"
import BudgetForm from "@/component/budgetForm"

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if (!userId) {
        redirect('/')
    }
    return userId
}

export default async function EditBudget({ params }: { params: { budget_id: string } }) {

    const userId = getUserId()

    const budgetId = params.budget_id

    const budget = await getBudgetById(budgetId)

    const expenseTypes = await getExpenseTypes()

    const editBudget = async (expenseType: string, limit: string): Promise<string> => {
        "use server"

        const res = await updateBudget(budgetId, {
            expenseType: expenseType,
            user: userId,
            limit: Number(limit)
        })

        redirect('/profile/budget')
    }

    return (
        <>
            <BackNavbar text="Budget" route="/profile/budget" />
            <div className="page-with-navbar-backnavbar">
                <BudgetForm formTitle="Edit Budget" buttonName="Edit" expenseTypesData={expenseTypes} submitFunction={editBudget} formType="edit" budget={budget} />
                {/* <EditBudgetForm budget={budget} expenseTypes={expenseTypes} formSubmitFunction={editBudget} /> */}
            </div>
        </>
    )
}