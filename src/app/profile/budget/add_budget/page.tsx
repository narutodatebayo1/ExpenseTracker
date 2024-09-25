import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getBudgetByUserIdExpenseTypeId, insertBudget } from "../../../../../hook/budgetHook";
import BackNavbar from "@/component/backNavbar";
import { getExpenseTypes } from "../../../../../hook/expenseTypeHook";
import BudgetForm from "@/component/budgetForm";

const getUserId = () => {
    const userId = cookies().get('user_id')?.value
    if(!userId) {
        redirect('/')
    }
    return userId
}

export default async function AddBudget({ searchParams }: { searchParams?: { expense_type_id: string } }) {

    const userId = getUserId()

    const expenseTypeId = searchParams?.expense_type_id

    const expenseTypes = await getExpenseTypes()

    const postBudget = async (expenseType: string, limit: string): Promise<string> => {
        "use server"

        const res = await getBudgetByUserIdExpenseTypeId(userId, expenseType)
        
        // cek budget sudah ada atau belum
        if(res._id) {
            return "Budget already exist"
        }

        const res2 = await insertBudget({
            expenseType: expenseType,
            user: userId,
            limit: Number(limit)
        })
        redirect('/profile/budget')
    }

    return (
        <>
            <BackNavbar text="Add Budget" route="/profile/budget" />
            <div  className="page-with-navbar-backnavbar">
                <BudgetForm formTitle="Add Budget" buttonName="Add" expenseTypesData={expenseTypes} submitFunction={postBudget} formType="add" expenseTypeId={expenseTypeId} userId={userId} />
                {/* <AddBudgetForm expenseTypeId={expenseTypeId} expenseTypes={expenseTypes} formSubmitFunction={postBudget} /> */}
            </div>
        </>
    )
}