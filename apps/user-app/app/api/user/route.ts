import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async() => {
    const session = await getServerSession(authOptions)
    if(session){
        return NextResponse.json({
            session : session
        })
    }
    return NextResponse.json({
        message : "logged out"
    })
}