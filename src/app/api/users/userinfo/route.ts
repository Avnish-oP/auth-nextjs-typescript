import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import next from "next";

dbConnect();

export async function GET (request: NextRequest){
    const token = request.cookies.get("token")?.value ;
    try {
        if(!token){
            return NextResponse.json({
                message: "User not authenticated",
                success: false
            })
        }

        const decodedInfo = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
        const id = decodedInfo.id;
        console.log(id);
        const user = await User.findById(id);
        const {username, email}= user
        if(!user){
            return NextResponse.json({
                message: "User not found",
                success: false
            })
        }
        return NextResponse.json({
            username:username,
            email: email,
            success: true,
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
        
    }

}