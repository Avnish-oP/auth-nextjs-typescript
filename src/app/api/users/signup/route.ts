import dbConnect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendMail from "@/helper/mailer";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { username, email, password } = reqBody;

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      
      return NextResponse.json({ message: "Please fill all the fields" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    
    const emailResponse = await sendMail({email:email , emailType:"verify", userId:savedUser._id});

    return NextResponse.json({
      message:"User created successfully",
      success: true,
      savedUser
  });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
