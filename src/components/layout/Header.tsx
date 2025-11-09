import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <motion.h1 
            className="text-2xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            Modules 👋
          </motion.h1>
        </Link>
        
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
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
