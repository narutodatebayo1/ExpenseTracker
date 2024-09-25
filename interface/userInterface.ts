import { ObjectId } from "mongodb";

export interface ICreateUser {
    name: string,
    password: string,
}

export interface IUser {
    _id: ObjectId,
    name: string,
    password: string,
}

export interface IUpdateUser {
    name: string,
    password: string,
}