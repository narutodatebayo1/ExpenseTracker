import dbConnect from "../../../../../lib/dbConnect"
import User from "../../../../../models/User"

export async function GET(req: Request, { params }: { params: { name: string } }) {

    const name = params.name

    await dbConnect()

    try {
        const user = await User.find({ name: name });
        return Response.json({ success: true, data: user.length > 0 ? user[0] : {} });
    } catch (error) {
        return Response.json({ success: false });
    }
}