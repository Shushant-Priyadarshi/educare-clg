import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../store/userStore";


const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
 


  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border bg-gradient-to-br from-emerald-900 to-emerald-700"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.h1
            className="text-2xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            EduCareer Companion
          </motion.h1>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </Link>
          <Link to="/study" className="text-foreground/80 hover:text-foreground transition-colors">
            Study
          </Link>
          <Link to="/resume" className="text-foreground/80 hover:text-foreground transition-colors">
            Resume
          </Link>
          <Link to="/career" className="text-foreground/80 hover:text-foreground transition-colors">
            Career
          </Link>
          <Link to="/chatbot" className="text-foreground/80 hover:text-foreground transition-colors">
            Chatbot
          </Link>
       

        {/* Auth Section */}
        <div className="relative">
          {user ? (
            <>
              {/* Profile Avatar */}
              <img
                src={user.photo}
                alt="profile"
                onClick={() => setOpen((o) => !o)}
                className="w-10 h-10 rounded-full border cursor-pointer hover:opacity-80 transition"
              />

              {/* Dropdown */}
              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3  bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={logout}
                      
                      className=" text-left p-1 text-sm text-black"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          ) : (
            <Link to = "/login">Login</Link>
          )}
        </div>
         </nav>
      </div>
    </motion.header>
  );
};

export default Header;
