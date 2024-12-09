"use client"
import { NewButton } from '@repo/ui/button'
import { TextInput } from '@repo/ui/textinput'
import React, { useState } from 'react'
import { SendMoneyTo } from '../../lib/actions/peerTransfer'
import prisma from '@repo/db/client'
import { useSession } from 'next-auth/react'
import { authOptions } from '../../lib/auth'
type Props = {}
async function getdetails(id : any){
  const res = await prisma.user.findFirst({
    where : {
      id : id
    }
  })
  return (res)
}

function page({}: Props) {
  // const {data : session} = useSession()
  // const id = session?.user?.id
    const [amount ,  setAmount] = useState(0)
    const [number , setNumber] = useState("");
  return (
    <div>
    <TextInput placeholder='enter the number ' label='Phone Number' onChange={(value) => {
        setNumber(value)
    }} />
        <TextInput placeholder='enter the amount ' label='Enter Amount' onChange={(value) => {
            setAmount(Number(value))
    }} />
      <NewButton  label = {"send Money"} onClick={async() => {
            await SendMoneyTo(amount , number)
      }}>Send the Money</NewButton>
    </div>
  )
}

export default page