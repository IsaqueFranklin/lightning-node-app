import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import { AuthOptions } from "next-auth";
import clientPromise from "./db-config";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        })

        /* GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
              params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
              }
            }
        }), */
    ],
    callbacks: {
        async session({ session }) {
            return session;
        }
    },
    secret: process.env.JWT_SECRET_KEY as string,
    adapter: MongoDBAdapter(clientPromise),
} as AuthOptions