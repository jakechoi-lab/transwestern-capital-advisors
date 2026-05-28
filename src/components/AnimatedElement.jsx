import React from 'react';
import { motion } from 'framer-motion';

const AnimatedElement = ({ 
  children, 
  animation = 'fadeInUp', 
  delay = 0, 
  duration = 0.6,
  className = '',
  ...props 
}) => {
  // Animation variants
  const variants = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    },
    fadeInUpSmall: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    fadeInDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 }
    },
    fadeInLeft: {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 }
    },
    fadeInLeftSmall: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    fadeInRight: {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 }
    },
    fadeInRightSmall: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    },
    scaleInSmall: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    },
    fadeInBlur: {
      hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
      visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
    },
    imageZoomIn: {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { opacity: 1, scale: 1 }
    }
  };

  const selectedVariant = variants[animation] || variants.fadeInUp;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.1, margin: "0px 0px -50px 0px" }}
      variants={selectedVariant}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.4, 0, 0.2, 1]
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;