import mongoose from "mongoose";

export interface Users extends mongoose.Document {
    name: string;
    password: string;
}

export const UserSchema = new mongoose.Schema<Users>({
    name: String,
    password: String
})

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);