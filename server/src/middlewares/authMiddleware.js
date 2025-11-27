import jwt from "jsonwebtoken"
import prisma from "../utils/prisma.js"

const verifyJWT = async(req,res,next) =>{
   try {
     const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if(!token){
        res.status(400).json({message:"Unauthorized request"})
    } 

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const userFromDB = await prisma.user.findUnique({
        where:{
            email:decodedToken?.email
        }
    })
    if(!userFromDB){
         res.status(400).json({message:"Invalid access token"})
    }

    req.user = userFromDB
    next()
   } catch (error) {
        console.error("JWT verification error:", error);
        res.status(400).json({ message: "Unauthorised request" });
   }
}

export default verifyJWT;