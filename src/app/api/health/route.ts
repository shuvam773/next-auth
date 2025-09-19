import { NextResponse } from 'next/server';

export async function GET() {
    const hasMongoUri = Boolean(process.env.MONGO_URI);
    const hasTokenSecret = Boolean(process.env.TOKEN_SECRET);

    return NextResponse.json({
        ok: true,
        env: {
            MONGO_URI: hasMongoUri ? 'present' : 'missing',
            TOKEN_SECRET: hasTokenSecret ? 'present' : 'missing',
            NODE_ENV: process.env.NODE_ENV
        }
    });
}


