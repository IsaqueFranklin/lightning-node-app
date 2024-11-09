import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { AuthOptions } from "next-auth";
import clientPromise from "./db-config";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
        }),
    ],
    secret: process.env.JWT_SECRET_KEY as string,
    adapter: MongoDBAdapter(clientPromise),
} as AuthOptions