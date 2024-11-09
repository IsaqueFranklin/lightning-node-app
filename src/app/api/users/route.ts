import connectMongo from "@/utils/database/db";
import User from "@/utils/database/models/User";
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

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

        const name = req.body.username.replace(/\s+/g, "");

        const newUserObject = {
            username: name,
        }

        const userExists = await User.findOne({ username: name });
        if (userExists){
            return res.json({userExists}, {status:200});
        }
        const user = await User.create(newUserObject);

        res.json({user}, {status:201});
    } catch(error){
        res.json({error}, {status:500});
    }
}