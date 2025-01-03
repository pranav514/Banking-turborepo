
import React from 'react'
import db from "@repo/db/client"
import { BalanceCard } from '../../../components/BalanceCard'
import { OnRampTransactions } from '../../../components/OnRampTransaction'
import { AddMoney } from '../../../components/AddMoney'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'

async function getBalance() {

    const session = await getServerSession(authOptions);
    // const val = JSON.stringify(session)
    // console.log(val)
    //@ts-ignore
    console.log(session?.user?.id)
    const balance = await db.balance.findFirst({
        where : {
    //@ts-ignore

            userId : session?.user?.id
        }
    });
    return {
        amount : balance?.amount || 0,
        locked : balance?.locked || 0,
    }
    
}
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await db.onRampTransaction.findMany({
        where: {
    //@ts-ignore

            userId: session?.user?.id
        }
    });
    return txns.map(t => ({
        Addtime: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}