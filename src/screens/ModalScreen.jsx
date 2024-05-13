import { motion, AnimatePresence } from "framer-motion";
import { FaCircleInfo } from "react-icons/fa6";

import { useState } from "react";
const ModalScreen = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="h-screen w-screen grid place-items-center"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1476673160081-cf065607f449?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      <button
        className="px-6 py-4 text-md text-white bg-neutral-500"
        onClick={() => setOpen(true)}
      >
        Open Modal
      </button>
      <Modal
        open={open}
        setOpen={setOpen}
        callback={() => console.log("confirmed")}
      />
    </div>
  );
};

const modalVariants = {
  open: {
    opacity: 1,
    transition: {
      delayChildren: 0.001,
    },
  },
  close: {
    opacity: 0,
  },
};

const boxVariants = {
  open: {
    scale: 1,
    opacity: 1,
    rotate: "0deg",
  },
  close: { scale: 0.9, opacity: 0, rotate: "1deg" },
};

// eslint-disable-next-line react/prop-types
const Modal = function ({ open, setOpen, callback }) {
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen backdrop-blur-md grid place-items-center"
            variants={modalVariants}
            initial="close"
            animate="open"
            exit="close"
          >
            <motion.div
              className="bg-purple-600 w-full max-w-lg p-8 rounded-lg flex flex-col gap-6 items-center"
              variants={boxVariants}
            >
              <FaCircleInfo size={50} color="white" />
              <h3 className="text-white text-3xl font-semibold">
                One more thing!
              </h3>
              <p className="text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                aperiam vitae, sapiente ducimus eveniet in velit.
              </p>
              <div className="w-full flex justify-between gap-2">
                <button
                  className="grow text-white font-semibold"
                  onClick={() => setOpen(false)}
                >
                  Go back
                </button>
                <button
                  className="grow bg-white text-purple-600 font-semibold p-2 rounded hover:bg-purple-100"
                  onClick={() => {
                    callback();
                    setOpen(false);
                  }}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModalScreen;
