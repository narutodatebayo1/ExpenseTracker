import mongoose, { ObjectId } from "mongoose";

export interface Expenses extends mongoose.Document {
    expenseType: ObjectId;
    user: ObjectId;
    amount: Number;
    description: String;
}

export const ExpenseSchema = new mongoose.Schema<Expenses>({
    expenseType: {
        type: mongoose.Types.ObjectId,
        ref: 'ExpenseType'
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    amount: Number,
    description: String
}, {timestamps: true})

export default mongoose.models.Expense || mongoose.model<Expenses>("Expense", ExpenseSchema);