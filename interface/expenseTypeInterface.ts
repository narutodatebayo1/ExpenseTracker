import { ObjectId } from "mongodb"

export interface IExpenseType {
    _id: ObjectId,
    title: string,
    icon: string,
    color: string,
}