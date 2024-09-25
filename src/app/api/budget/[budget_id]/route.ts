import dbConnect from "../../../../../lib/dbConnect";
import Budget from "../../../../../models/Budget";
import Models from "../../../../../models/Models";

export async function GET(req: Request, { params }: { params: { budget_id: string } }) {

    const { User, ExpenseType, Expense, Budget } = Models()

    await dbConnect()

    const id = params.budget_id

    try {
        const budget = await Budget.findById(id).populate('expenseType').populate('user');
        return Response.json({ success: true, data: budget });
    } catch (error) {
        return Response.json({ success: false });
    }
}

export async function PUT(req: Request, { params }: { params: { budget_id: string } }) {

    await dbConnect()

    const id = params.budget_id

    try {
        const body = await req.json()
        const budget = await Budget.updateOne({ _id: id }, body)
        return Response.json({ success: true, data: budget });
    } catch (error) {
        return Response.json({ success: false });
    }
}

export async function DELETE(req: Request, { params }: { params: { budget_id: string } }) {

    await dbConnect()

    const id = params.budget_id

    try {
        const expenses = await Budget.deleteOne({ _id: id });
        return Response.json({ success: true, data: expenses });
    } catch (error) {
        return Response.json({ success: false });
    }
}