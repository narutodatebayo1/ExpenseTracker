import dbConnect from "../../../../../lib/dbConnect";
import Expense from "../../../../../models/Expense";
import Models from "../../../../../models/Models";
import { ObjectId } from "mongodb";

export async function GET(req: Request, { params }: { params: { expense_id: string } }) {

    const { User, ExpenseType, Expense } = Models()

    await dbConnect()

    const id = params.expense_id

    const { searchParams } = new URL(req.url);
    const timezone = searchParams.get('timezone');

    try {
        const expense = await Expense.aggregate([
            {
                $match: {
                    _id: new ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "expensetypes",
                    localField: "expenseType",
                    foreignField: "_id",
                    as: "expenseType"
                }
            },
            {
                $unwind: "$expenseType"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $addFields: {
                    date: {
                        $dateToString: {
                            date: "$createdAt",
                            timezone: timezone
                        }
                    }
                }
            },
        ]);
        return Response.json({ success: true, data: expense.length > 0 ? expense[0] : {} });
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}

export async function PUT(req: Request, { params }: { params: { expense_id: string } }) {

    await dbConnect()

    const id = params.expense_id

    try {
        const body = await req.json()
        const expense = await Expense.updateOne({ _id: id }, body)
        return Response.json({ success: true, data: expense });
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}

export async function DELETE(req: Request, { params }: { params: { expense_id: string } }) {

    await dbConnect()

    const id = params.expense_id

    try {
        const expenses = await Expense.deleteOne({ _id: id });
        return Response.json({ success: true, data: expenses });
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}