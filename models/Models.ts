import {Users, UserSchema} from "./User";
import {ExpenseTypes, ExpenseTypeSchema} from "./ExpenseType";
import {Expenses, ExpenseSchema} from "./Expense";
import { Budgets, BudgetSchema } from "./Budget";
import mongoose from "mongoose";

export default function Models() {
    const User = mongoose.models.User || mongoose.model<Users>("User", UserSchema);
    const ExpenseType = mongoose.models.ExpenseType || mongoose.model<ExpenseTypes>("ExpenseType", ExpenseTypeSchema);
    const Expense = mongoose.models.Expense || mongoose.model<Expenses>("Expense", ExpenseSchema);
    const Budget = mongoose.models.Budget || mongoose.model<Budgets>("Budget", BudgetSchema);

    return { User, ExpenseType, Expense, Budget }
}