import express from "express"
import { Request , Response } from "express";
import  db from "@repo/db/client";
const app = express();
app.use(express.json())

app.post("/hdfcwebhook" ,async (req : Request , res : Response) => {
    const {token , userId , amount} = req.body
    try{
        console.log("hello")
        await db.$transaction([
            db.balance.update({
                where : {
                    userId : userId,
                },
                data : {
                    amount : {
                        increment : Number(amount)
                    }

                }
            }),
            db.onRampTransaction.update({
                where : {
                    token : token
                },
                data : {
                    status : "Success",
                    amount : Number(amount)
                }
            })
        ]);
        res.json({
            message : "captured",
        })
    }catch(e){
        res.status(403).json({message : "error in the data" , e})
    }
})


app.listen(3003 , async () => {
    console.log("webhook is live")
})