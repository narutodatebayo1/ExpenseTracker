import dbConnect from "../../../../lib/dbConnect";
import Budget from "../../../../models/Budget";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {

    await dbConnect()

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('user_id');
    const expenseTypeId = searchParams.get('expense_type_id');

    if(!userId && !expenseTypeId) {
        return
    }

    try {
        if(userId && expenseTypeId) {
            const budget = await Budget.aggregate([
                {
                    $match: {
                        expenseType: new ObjectId(expenseTypeId!),
                        user: new ObjectId(userId!),
                    },
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
            ])

            return Response.json({ success: true, data: budget.length == 1 ? budget[0] : {} });
        } else if(userId) {
            const budgets = await Budget.aggregate([
                {
                    $match: {
                        user: new ObjectId(userId!),
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
            ]);

            const totalBudget = await Budget.aggregate([
                {
                    $match: {
                        user: new ObjectId(userId!),
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalBudget: { $sum: "$limit" }
                    }
                }
            ])

            if(budgets.length > 0) {
                return Response.json({ success: true, budgets: budgets, totalBudget: totalBudget[0].totalBudget });
            }

            return Response.json({ success: true, budgets: budgets, totalBudget: 0 });
        }
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}

export async function POST(req: Request) {

    await dbConnect()

    try {
        const body = await req.json()
        const budget = await Budget.create(body);
        return Response.json({ success: true, data: budget });
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}