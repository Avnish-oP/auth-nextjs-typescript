import dbConnnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

dbConnnect();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const passwordCheck = await bcryptjs.compare(password, user.password);
    if (!passwordCheck) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
          success: false,
        },
        { status: 401 }
      );
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };

    const jwtToken = jwt.sign(tokenData, process.env.SECRET_KEY!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      {
        message: "Login successful",
        success: true,
      },
      { status: 200 }
    )
    response.cookies.set("token", jwtToken, {
        httpOnly: true,
      });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
