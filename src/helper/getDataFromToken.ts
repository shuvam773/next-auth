import jwt from 'jsonwebtoken';

interface TokenData {
    id: string;
    username: string;
    email: string;
}

export const getDataFromToken = (request: Request): Promise<string> => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as TokenData;
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}