import { motion } from "framer-motion";

const BackgroundShapes = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Top right organic shape */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-20 -right-20 w-96 h-96 bg-sage/30 rounded-full blur-3xl"
      />
      
      {/* Bottom left flowing shape */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.3, x: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className="absolute -bottom-32 -left-32 w-[600px] h-[400px] bg-cream/20 rounded-[50%] blur-3xl"
        style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
      />
      
      {/* Middle accent circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-2xl"
      />
      
      {/* Top left small circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="absolute top-32 left-20 w-32 h-32 bg-sage/40 rounded-full blur-xl"
      />
      
      {/* Bottom right accent */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 0.25, y: 0 }}
        transition={{ duration: 1.8, delay: 0.4 }}
        className="absolute bottom-20 right-32 w-80 h-80 bg-accent/20 rounded-[40%_60%_70%_30%_/_30%_50%_50%_70%] blur-3xl"
      />
    </div>
  );
};

export default BackgroundShapes;
