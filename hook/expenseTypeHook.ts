

export const getExpenseTypes = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/expense_type`)
    const data = await res.json()
    return data.data
}