import connectMongo from "@/utils/database/db";
import Posts from "@/utils/database/models/Posts";
import { NextRequest, NextResponse } from "next/server";

export async function handler(req: NextRequest, res: NextResponse){
    switch (req.method) {
        case "GET": {
            return getPosts(req, res);
        }
        case "POST": {
            return addPost(req, res);
        }
        default: {
            return NextResponse.json({ error: "Method not allowed " }, { status: 405 });
        }
    }
}

async function getPosts(req:any, res:any){
    try {
        await connectMongo();

        const posts = await Posts.find();

        res.json({posts}, {status: 200});
    } catch (error) {
        res.json({error}, {status: 500});
    }
}

async function addPost(req:any , res:any){
    try {
        await connectMongo();

        const user = await Posts.create(req.body);

        res.json({user}, {status:201});
    } catch(error){
        res.json({error}, {status:500});
    }
}