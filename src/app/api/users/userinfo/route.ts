import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

dbConnect();

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  try {
    if (!token) {
      return NextResponse.json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decodedInfo = jwt.verify(
      token,
      process.env.SECRET_KEY!
    ) as JwtPayload;
    const id = decodedInfo.id;
    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json({
        message: "Invalid token",
        success: false,
      });
    }
    const { username, email } = user;
    return NextResponse.json({
      username: username,
      email: email,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
