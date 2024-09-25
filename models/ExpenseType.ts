import mongoose from "mongoose";

export interface ExpenseTypes extends mongoose.Document {
    title: string;
    icon: string;
    color: string;
}

export const ExpenseTypeSchema = new mongoose.Schema<ExpenseTypes>({
    title: String,
    icon: String,
    color: String
})

export default mongoose.models.ExpenseType || mongoose.model<ExpenseTypes>("ExpenseType", ExpenseTypeSchema);