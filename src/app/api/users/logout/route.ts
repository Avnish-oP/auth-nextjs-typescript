import dbConnnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


dbConnnect();

export async function POST(request:NextRequest){
    try {
        const response = NextResponse.json({
            message: "User logged out successfully",
            success: true
        })
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0),
        })

        return response;

    } catch (error:any) {
        NextResponse.json(
            {error: error.message},
            {status: 400}
        )
    }
}