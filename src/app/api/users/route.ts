import connectMongo from "@/utils/database/db";
import User from "@/utils/database/models/User";
import { NextRequest, NextResponse } from "next/server";
import axios from 'axios';

// GET request handler
export async function GET(req: NextRequest) {
    try {
        await connectMongo();

        const users = await User.find();

        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST request handler
export async function POST(req: NextRequest) {
    try {
        await connectMongo();

        const body = await req.json();
        const name = body.username.replace(/\s+/g, "");

        const userExists = await User.findOne({ username: name });
        if (userExists) {
            return NextResponse.json({ exists: userExists }, { status: 200 });
        }

        const newUser = await User.create({ username: name });

        return NextResponse.json({ user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
