"use server"
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { use } from "react";

export  const onRamp =  async (amount : number  , provider  :string) => {
    const session = await getServerSession(authOptions)
    const userid = session?.user?.id
    const token = Math.random().toString()
    if(!userid){
        return {
            message : "login first to add money"
        }

    }
    const user = await prisma.onRampTransaction.create({
        data : {
            status : "Processing",
            token : token,
            provider : provider,
            amount : amount * 100,
            startTime  : new Date(),
            userId : userid

        }
    })
    return {
        message : "Transaction made",
        user,
    }

}