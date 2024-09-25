import mongoose, { ObjectId } from "mongoose";

export interface Budgets extends mongoose.Document {
    user: ObjectId;
    expenseType: ObjectId;
    limit: Number;
}

export const BudgetSchema = new mongoose.Schema<Budgets>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    expenseType: {
        type: mongoose.Types.ObjectId,
        ref: 'ExpenseType'
    },
    limit: Number,
})

export default mongoose.models.Budget || mongoose.model<Budgets>("Budget", BudgetSchema);