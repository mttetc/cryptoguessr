import Header from '@/components/header';
import { motion } from 'framer-motion';

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <motion.div
      className="flex flex-col h-screen bg-background text-foreground"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Header />
      <div className="flex-1 flex justify-center">{children}</div>
    </motion.div>
  );
};

export default Layout;
