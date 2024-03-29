import dbConnnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

dbConnnect();

export async function POST(request: NextRequest) {
    try{
        const reqBody = await request.json();
        const {token} = reqBody;
        const user = await User.findOne({verifyToken: token});
        if(!user){
            return NextResponse.json({message: "Invalid token"}, {status: 400});
        }
        if(user.verifyExpires < Date.now()){
            return NextResponse.json({message: "Token expired"}, {status: 400});
        }
        await User.findByIdAndUpdate(user._id, {
            isVerified: true,
            verifyToken: "",
            verifyExpires: null
            });
        return NextResponse.json({message: "Email verified", success: true});
    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}