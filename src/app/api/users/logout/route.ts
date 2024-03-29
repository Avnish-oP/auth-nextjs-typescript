import dbConnnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


dbConnnect();

export async function POST(request: NextRequest) {
    const { email, password } = await request.json();
    try {
        const