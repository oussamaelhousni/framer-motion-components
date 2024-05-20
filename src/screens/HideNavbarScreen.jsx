import React, { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
const HideNavbarScreen = () => {
  return (
    <div className="relative">
      <Navbar />
      <div className="bg-neutral-700 min-h-[300vh]"></div>
    </div>
  );
};

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (currentScroll) => {
    const previosScrollValue = scrollY.getPrevious();
    if (previosScrollValue > currentScroll) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });
  return (
    <motion.div
      className="p-8 bg-neutral-800 text-neutral-100 text-center shadow-lg sticky top-0 left-0"
      animate={hidden ? "hidden" : "show"}
      variants={{
        show: {
          y: 0,
        },
        hidden: {
          y: -100,
        },
      }}
      transition={{
        duration: 0.2,
      }}
    >
      This navbar will be hidden on scroll
    </motion.div>
  );
};

export default HideNavbarScreen;
