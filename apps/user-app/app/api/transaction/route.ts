import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { NextResponse } from "next/server"
export const GET = async() => {
    const session = await getServerSession(authOptions)
    // @ts-ignore
    const userId = session?.user?.id
    const tran = await prisma.p2pTransfer.findMany({
        where : {
            fromUserId : userId 
        },select : {
            amount : true,
            toUser : {

                select : {
                    name : true,
                    email : true,
                    phonenumber : true
                }
            }
        }
    })
    const recived = await prisma.p2pTransfer.findMany({
        where  : {
            toUserId : userId
        },
        select : {
            amount : true,
            fromUser : {
                select : {
                    name : true,
                    email : true,
                    phonenumber : true
                }
            }
        }
    })
    return NextResponse.json({
            sended : tran,
            recived : recived
    })
}