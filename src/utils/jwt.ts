import jwt from 'jsonwebtoken';


export interface TokenPayload {
    userId: string;
    iat?: number;
    exp?: number;
}


const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN

if (!ACCESS_TOKEN_SECRET)
    throw new Error('ACCESS_TOKEN is not set')

if (!REFRESH_TOKEN_SECRET)
    throw new Error('REFRESH_TOKEN is not set')

export const signAccessToken = (userId: string) => {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const signRefreshToken = (userId: string) => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '15m' })
}

export const verifyToken = (token: string, type: 'access' | 'refresh'): TokenPayload => {
    const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET

    const payload = jwt.verify(token, secret);

    if (typeof payload === 'string' || !('userId' in payload)) {
        throw new Error('Invalid token payload');
    }

    return payload as TokenPayload
}