import { InsertBudget, IUpdateBudget } from "../interface/budgetInterface"

export const getBudgetById = async (budgetId: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/budget/${budgetId}`)
    const data = await res.json()
    return data.data
}

export const getBudgetByUserId = async (userId: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/budget?user_id=${userId}`)
    const data = await res.json()
    return data
}

export const getBudgetByUserIdExpenseTypeId = async (userId: string, expenseTypeId: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/budget?user_id=${userId}&expense_type_id=${expenseTypeId}`)
    const data = await res.json()
    return data.data
}

export const insertBudget = async (budget: InsertBudget) => {
    const res = await fetch(`${process.env.BASE_URL}/api/budget`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(budget)
    })
    const data = await res.json()
    return data
}

export const updateBudget = async (budgetId: string, newBudget: IUpdateBudget) => {
    const res = await fetch(`${process.env.BASE_URL}/api/budget/${budgetId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newBudget)
    })
    const data = await res.json()
    return data
}

export const deleteBudget = async (budgetId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/budget/${budgetId}`, { method: "DELETE" });
    const data = await res.json();
    return data
}