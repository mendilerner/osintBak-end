import jwt from 'jsonwebtoken'
import { tokenDataInterface } from './authInterfaces'

const key = process.env.JWT_KEY as string



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