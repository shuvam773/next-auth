import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        console.log(reqBody);

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
        }

        // Check if password is correct
        if (!user.password) {
            return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
        }
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

        // Create response
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

        // Set token as HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 // 1 day
        });

        return response;

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
