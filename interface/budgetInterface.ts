import { ObjectId } from "mongodb"
import { IExpenseType } from "./expenseTypeInterface"
import { IUser } from "./userInterface"

export interface IBudget {
    _id: ObjectId,
    expenseType: IExpenseType,
    user: IUser,
    limit: number,
}

export interface IUpdateBudget {
    expenseType: string,
    user: string,
    limit: number
}

export interface InsertBudget {
    expenseType: string,
    user: string,
    limit: number
}

export interface IBudgetData {
    success: boolean,
    budgets: IBudget[],
    totalBudget: number
}