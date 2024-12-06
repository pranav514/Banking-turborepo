"use client"
import Image, { type ImageProps } from "next/image";
import { NewButton } from "@repo/ui/button";
import styles from "./page.module.css"
import { useSession } from "next-auth/react";
import { signIn , signOut } from "next-auth/react";
export default function Home() {
  const session = useSession()
  const letter = JSON.stringify(session.data?.user?.email)
  return (

    <div>
      <div className="flex flex-row items-center">
        <p>{letter[1]?.toUpperCase()}</p>
    {session.data ? <NewButton label = {"logout"} onClick = {() => {
      signOut();
    }} /> : <NewButton  label = {"Signin"} onClick = {() => {
      signIn()
    }}/>}    
      </div>
      
  
    </div>
  );
}
