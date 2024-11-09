import connectMongo from "@/utils/database/db";
import User from "@/utils/database/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function handler(req: NextRequest, res: NextResponse){
    switch (req.method) {
        case "GET": {
            return getUsers(req, res);
        }
        case "POST": {
            return addUser(req, res);
        }
        default: {
            return NextResponse.json({ error: "Method not allowed " }, { status: 405 });
        }
    }
}

async function getUsers(req:any, res:any){
    try {
        await connectMongo();

        const users = await User.find();

        res.json({users}, {status: 200});
    } catch (error) {
        res.json({error}, {status: 500});
    }
}

async function addUser(req:any , res:any){
    try {
        await connectMongo();

        const user = await User.create(req.body);

        res.json({user}, {status:201});
    } catch(error){
        res.json({error}, {status:500});
    }
}