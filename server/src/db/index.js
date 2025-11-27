import prisma from "../utils/prisma.js"


const connectDB = async () =>{
    try {
        await prisma.$connect()
        console.log("************************************************************************");
        
        console.log("             Successfully connected to NEONDB");
    } catch (error) {
        console.error("Could not able to connect NEONDB: ",error.message)
        process.exit(1)
    }
}

export default connectDB