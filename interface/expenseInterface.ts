import { ObjectId } from "mongodb"
import { IExpenseType } from "./expenseTypeInterface"
import { IUser } from "./userInterface"

export interface IExpense {
    _id:  string,
    expenseType: IExpenseType,
    user: IUser,
    amount: number,
    description: string,
    createdAt: string,
    updatedAt: string,
    __v: number,
    date: string
}

export interface ICreateExpense {
    expenseType: string,
    user: string,
    amount: number,
    description: string,
}

export interface IUpdateExpense {
    expenseType: string,
    amount: number,
    description: string,
}

export interface IExpenseGroupByDate {
    date: string,
    expenses: IExpense[]
}

export interface IDoughnutChartData {
    expenseType: {
        _id: ObjectId,
        title: string,
        icon: string,
        color: string,
    },
    totalAmount: number,
}