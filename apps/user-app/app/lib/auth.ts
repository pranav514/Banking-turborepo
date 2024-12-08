import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import { AuthOptions } from "next-auth";
import { use } from "react";

export const authOptions : AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: 'email', type: 'text', placeholder: '' },
              password: { label: 'password', type: 'password', placeholder: '' },
              phone : {label : "phonenumber" , type : "text" , placeholder:"46445445"},
            //   name : {label : "name" , type : "text" , placeholder : "john"}
            },
            async authorize(credentials: any) {
                const existinguser = await db.user.findUnique({
                    where : {
                        phonenumber : credentials.phone
                    }
                })
                if(existinguser){
                    if(existinguser.password == credentials.password){
                        return {
                            id : existinguser.id,
                            email : existinguser.email,
                            phone : existinguser.phonenumber
                        }
                    }
                    return null;
                }
                const user = await db.user.create({
                    data : {
                        email : credentials.email,
                        phonenumber : credentials.phone,
                        password : credentials.password,
                    }
                })
                return {
                    id : user.id,
                    email : user.email,
                    phone : user.phonenumber,
                };
            },
          })
      ],
      secret : process.env.NEXTAUTH_SECRET || "secret",
      callbacks : {
        async session({token , session} : any){
            session.user.id = token.sub
            return session
        },
        // async signIn({user}){
        //     if(user){
        //         return '/dashboard'
        //     }
        //     return false;
        // }
      },
      
}