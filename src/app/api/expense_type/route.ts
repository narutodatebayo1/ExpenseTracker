import dbConnect from "../../../../lib/dbConnect";
import ExpenseType from "../../../../models/ExpenseType";


export async function GET(req: Request) {

    await dbConnect()

    try {
        const expenseTypes = await ExpenseType.find({});
        return Response.json({ success: true, data: expenseTypes });
    } catch (error) {
        return Response.json({ success: false });
    }
}