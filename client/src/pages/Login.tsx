import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { useAuth } from "../store/userStore";
import axios from "axios";
//import yourGif from "@/assets/login-animation.gif"; // <-- your gif file
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const res = await axios.post(
        "http://localhost:9090/api/auth/login",
        { credential: credentialResponse.credential },
        { withCredentials: true }
      );

      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.log("Login Failed:", err);
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-emerald-900 to-emerald-700 flex items-center justify-center px-6">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 
        w-full max-w-4xl flex flex-col md:flex-row overflow-hidden"
      >
        {/* Left GIF Section */}
        <div className="md:w-1/2 w-full bg-white/10 flex items-center justify-center p-6">
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={"/images/neetu.png"}
            alt="Login Animation"
            className="rounded-2xl w-full h-auto object-contain drop-shadow-xl"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center space-y-6">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-bold text-white text-center md:text-left"
          >
            Sign in to <span className="text-yellow-300">EduCareer Companion</span>
          </motion.h1>

          <p className="text-white/80 leading-relaxed text-[16px] text-center md:text-left">
            Your all-in-one platform for:
            <br />📚 Smart study planning  
            <br />🧑‍💼 Career guidance  
            <br />📝 Resume optimization  
            <br />🤖 AI mentorship  
          </p>

          {/* Google Login Button */}
          <div className="flex justify-center md:justify-start pt-4">
            <GoogleLogin onSuccess={handleGoogleLogin} />
          </div>

          <p className="text-white/60 text-sm text-center md:text-left pt-2">
            Continue with Google to get started ⭐
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
