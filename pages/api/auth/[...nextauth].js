import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { databaseConnection } from "@/helpers/db-helper";
import { verifyPassword } from "@/helpers/auth-helper";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials){
        const client = await databaseConnection();
        const users = client.db().collection("users");

        const user = await users.findOne({ email: credentials.email });

        if(!user){
          client.close();
          throw new Error(!credentials.email ? "Incorrect Email" : "No such email was found");
        }
        
        const isValid = await verifyPassword(credentials.password, user.password); // parameters: used password, hashed password 

        if(!isValid){
          client.close();
          throw new Error("Incorrect Password");
        }
        client.close();
        return{ email: user.email }; // Authorization success
      }
    })
  ]
};

export default NextAuth(authOptions);