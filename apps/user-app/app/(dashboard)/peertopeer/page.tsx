"use client"
import { NewButton } from '@repo/ui/button'
import { TextInput } from '@repo/ui/textinput'
import React, { use, useEffect, useState } from 'react'
import { SendMoneyTo } from '../../lib/actions/peerTransfer'
import prisma from '@repo/db/client'
import { useSession } from 'next-auth/react'
import { authOptions } from '../../lib/auth'
import axios from 'axios'
type Props = {}


function page({}: Props) {
const [transaction , setTransaction] = useState([]);
const [recivedtran , setRecivedTran]  = useState([]);
const [amount ,  setAmount] = useState(0)
const [number , setNumber] = useState("");
  useEffect(() => {
    const val = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/transaction");
        setTransaction(res.data.sended)
        setRecivedTran(res.data.recived)
      }catch(e){
        console.log("failed to fetch")
      }
    }
    val()
  } , [])
   
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
      <div>
        <div className='flex flex-row'>
          <p>Send Transaction History</p>
        <p className='ml-3 text-sm bg-stone-50 '>total transaction : {transaction.length}</p>
        </div>

     {
      transaction.map((t : any) => {
        return <div>
          <h3><hr /></h3>
          <div className='text-gray-400 text-sm h-50 bg-stone-50 '>
             <p>amount : {t.amount}</p> 
          <p>name : {t.toUser.name}</p>
          <p>email : {t.toUser.email}</p>
          </div>
        
            
        </div>
      })
     }
     <div>
      <div>
        {
          recivedtran.length > 0 ?
          recivedtran.map((t : any) => {
            return <div >
          <h3><hr /></h3>

           <div className='text-gray-400 text-sm h-50 bg-stone-50 '>
             <p>amount : {t.amount}</p> 
          <p>name : {t.fromUser.name}</p>
          
          <p>email : {t.fromUser.email}</p>
          </div>
            </div>
          }) : ""
        }
      </div>
    
     </div>
      </div>
    </div>
  )
}

export default page