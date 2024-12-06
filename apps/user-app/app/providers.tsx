"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { RecoilRoot } from 'recoil'

type Props = {}

function Providers({children} : {
    children : React.ReactNode
}) {
  return (
    <div>
        <SessionProvider>
             <RecoilRoot>
            {children}
        </RecoilRoot>
        </SessionProvider>
       
    </div>
  )
}

export default Providers