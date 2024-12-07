import db from "@repo/db/client";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions : AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
          })
      ],
      secret : process.env.NEXTAUTH_SECRET || "secret",
      callbacks : {
        async session({token , session} : any){
            session.user.id = token.sub
            return session
        },
        async signIn({account , profile} : any){
            if(account.provider == "google"){
                const existing = await db.merchant.findUnique({
            where : {
                email : profile.email
            }
           })
           if(!existing){
            const user =  await db.merchant.create({
                data : {
                    email : profile.email,
                    auth_type : "Google"
                }
            })
            return true
           }
            }
           
            return true;
        }
      }

      
}