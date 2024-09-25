import { ICreateExpense, IUpdateExpense } from "../interface/expenseInterface"

export const getDoughnutChartData = async (userId: string, startDate: string, endDate: string, timezone: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/expense?user_id=${userId}&start_date=${startDate}&end_date=${endDate}&timezone=${timezone}&group_by=expense_type`)
    const data = await res.json()
    return data
}

export const getExpenseByUserIdExpenseTypeIdDateRange = async (userId: string, expenseTypeId: string, startDate: string, endDate: string, timezone: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/expense?user_id=${userId}&expense_type_id=${expenseTypeId}&start_date=${startDate}&end_date=${endDate}&timezone=${timezone}`)
    const data = await res.json()
    return data
}

export const getExpenseByUserIdExpenseTypeIdDateRangeClient = async (userId: string, expenseTypeId: string, startDate: string, endDate: string, timezone: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expense?user_id=${userId}&expense_type_id=${expenseTypeId}&start_date=${startDate}&end_date=${endDate}&timezone=${timezone}`)
    const data = await res.json()
    return data
}

export const getExpenseByExpenseId = async (expenseId: string, timezone: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/expense/${expenseId}?timezone=${timezone}`);
    const data = await res.json();
    return data.data
}

export const getExpenseGroupByDate = async (userId: string, startDate: string, endDate: string, timezone: string) => {
    const res = await fetch(`${process.env.BASE_URL}/api/expense?user_id=${userId}&start_date=${startDate}&end_date=${endDate}&timezone=${timezone}&group_by=date`)
    const data = await res.json()
    return data.data
}

export const getExpenseByUserId = async (userId: string, timezone: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expense?user_id=${userId}&timezone=${timezone}`)
    const data = await res.json()
    return data.data
}

export const insertExpense = async (expense: ICreateExpense) => {
    const res = await fetch(`${process.env.BASE_URL}/api/expense`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(expense)
    })
    const data = await res.json()
    return data
}

export const updateExpense = async (expenseId: string, newExpense: IUpdateExpense) => {
    const res = await fetch(`${process.env.BASE_URL}/api/expense/${expenseId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newExpense)
    })
    const data = await res.json()
    return data
}

export const deleteExpense = async (expenseId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expense/${expenseId}`, { method: "DELETE" });
    const data = await res.json();
    return data
}