import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};
// eslint-disable-next-line react/prop-types
const Slider = ({ className, images }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  // eslint-disable-next-line react/prop-types

  const paginate = (newDirection) =>
    // eslint-disable-next-line react/prop-types
    setPage([wrap(0, images.length, page + newDirection), newDirection]);

  return (
    <div className={twMerge("relative overflow-hidden select-none", className)}>
      <AnimatePresence initial={false} custom={direction}>
        {/*eslint-disable-next-line react/prop-types*/}
        <motion.img
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          src={images[page]}
          key={images[page]}
          className="w-full h-full object-cover absolute select-none left-0 top-0"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          transition={{
            opacity: { duration: 0.2 },
            x: { type: "spring", stiffness: 300, damping: 30 },
          }}
        />
      </AnimatePresence>
      <BsArrowLeftShort
        className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer bg-gray-100 rounded-full transition-colors z-10 text-black"
        size={40}
        onClick={() => paginate(-1)}
      />
      <BsArrowRightShort
        className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer bg-gray-100 rounded-full transition-colors z-10 text-black"
        size={40}
        onClick={() => paginate(1)}
      />
    </div>
  );
};

export default Slider;
