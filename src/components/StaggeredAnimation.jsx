import React from 'react';
import { motion } from 'framer-motion';

const StaggeredAnimation = ({ 
  children, 
  staggerDelay = 0.1, 
  baseDelay = 0,
  className = '',
  ...props 
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: baseDelay
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1 }}
      variants={containerVariants}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div variants={itemVariants} key={index}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredAnimation;