import prisma from "../utils/prisma.js";
import {generateAccessToken} from "../utils/jwt.js"
import {googleClient} from "../index.js"
//get profile
const getProfile = async(req,res) =>{
    return res.status(200).json({
        user:req.user,
        message:"User fetched successfully"
    })
}

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };


//googleSignin
const googleOAuth = async(req,res) =>{
    const { credential } = req.body;
    if(!credential){
        return res.status(400).json({message:"Oauth credentials are missing"})
    }
    const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const {email,name,picture} = payload


  const userExist = await prisma.user.findUnique({
    where:{
        email
    }
  })

  let user
  if(!userExist){
    const userCreated = await prisma.user.create({
        data:{
            name,
            email,
            photo:picture
        }
    })
    if(!userCreated){
        return res.status(500).json({message:"Something went wrong while registering the user"})
    }
    user = userCreated
  }else{
    user = userExist
  }
  const accessToken = generateAccessToken(user)

   const userResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    photo:user.photo
  };

  return res.status(200).cookie("accessToken", accessToken, options).json({
    user:userResponse,
    message:"Logged In successfully"
  })

 
}

//logout
const logoutUser = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).json({message:"Invalid user"})
  }
  return res
    .clearCookie("accessToken", options)
    .status(200)
    .json({message:"Logged out successfully"});
};

export {googleOAuth,getProfile ,logoutUser}