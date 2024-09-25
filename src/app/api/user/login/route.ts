import dbConnect from "../../../../../lib/dbConnect"
import User from "../../../../../models/User"

export async function POST(req: Request) {

    const body = await req.json()

    await dbConnect()

    try {
        const user = await User.find({
            name: body.name,
            password: body.password
        });
        return Response.json({ success: true, data: user });
    } catch (error) {
        return Response.json({ success: false });
    }
}