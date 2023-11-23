import jwt from 'jsonwebtoken'

const key = process.env.JWT_KEY as string

export interface tokenDataInterface{
    email: string;
    isAdmin: boolean;
}

const expirationTime = '1d'
export const generateAuthToken = (user:tokenDataInterface) => {
    const {email, isAdmin} = user
    const token = jwt.sign({email, isAdmin}, key, { expiresIn: expirationTime })
    return token
}

export const varifyToken = (tokenFromClient: string) => {
    try{
        const userData = jwt.verify(tokenFromClient, key)
        return userData
    }
    catch (err){
        return null
    }
}