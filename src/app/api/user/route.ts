import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import { NextResponse } from "next/server";


export async function GET() {

    await dbConnect()

    try {
        const users = await User.find({});
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        return NextResponse.json({ success: false });
    }
}

export async function POST(req: Request) {

    await dbConnect()

    try {
        const body = await req.json()
        const user = await User.create(body);
        return Response.json({ success: true, data: user });
    } catch (error) {
        console.log(error)
        return Response.json({ success: false });
    }
}

// 66987fb09c3c29632b9cd947
// 66987fd29c3c29632b9cd948