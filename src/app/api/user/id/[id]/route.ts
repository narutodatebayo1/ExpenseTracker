import dbConnect from "../../../../../../lib/dbConnect"
import User from "../../../../../../models/User"

export async function GET(req: Request, { params }: { params: { id: string } }) {

    const id = params.id

    await dbConnect()

    try {
        const user = await User.findById(id);
        return Response.json({ success: true, data: user });
    } catch (error) {
        return Response.json({ success: false });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {

    await dbConnect()

    const id = params.id

    try {
        const body = await req.json()
        const user = await User.updateOne({ _id: id }, body)
        return Response.json({ success: true, data: user });
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}