"use server"
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
import { getServerSession } from "next-auth";
export async function SendMoneyTo(amount:number, number:string) {
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const userId  = String(session?.user?.id)
    if(!userId) return { message : "UnAuthorized User!"};
    const toUser = await prisma.user.findFirst({
        where:{
            phonenumber : number
        }
    })

    if(!toUser) return {message : 'Invalid Number. Please provide a valid one..'};

    try{
        await prisma.$transaction(async (tx) =>{
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${(userId)} FOR UPDATE`
            const sender = await tx.balance.findUnique({
                where : {
                    userId : userId
                }
            })
            if(!sender || sender.amount / 100 < amount){
                throw new Error("sender not present")
            }
            await tx.balance.update({
                where:{userId : String(sender.userId)},
                data:{amount : {decrement:amount * 100}}
            })

            await tx.balance.update({
                where:{userId : toUser.id},
                data:{amount : {increment:amount * 100}}
            })
            await tx.p2pTransfer.create({
                data : {
                    fromUserId : userId,
                    toUserId : toUser.id,
                    amount,
                    timestamp : new Date()
                }
            })
        });
    }catch(e){
        console.log("Error => ", e);
        return { message : e ,  }   
    }

    return {message : 'Transaction Successful!'}

}