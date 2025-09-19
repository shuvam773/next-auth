import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helper/getDataFromToken';

connect();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}