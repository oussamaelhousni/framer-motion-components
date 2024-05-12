import { twMerge } from "tailwind-merge";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
const StickyCardsScreen = () => {
  return (
    <div className="relative">
      <Card
        heading="A new type of Calendar"
        subheading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!"
      />
      <Card
        className="bg-pink-500"
        heading="#1 in data privacy"
        subheading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!"
      />
      <Card
        className="bg-blue-500"
        heading="Use your existing tools"
        subheading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!"
      />
      <Card
        className="bg-green-500"
        heading="Customers love us"
        subheading="Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo officia atque iure voluptatibus necessitatibus odit cupiditate reprehenderit iusto quaerat!"
      />

      <div
        className=" min-h-screen
      "
      ></div>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
function Card({ heading, subheading, className }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({});

  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  return (
    <motion.div
      className={twMerge("bg-black sticky top-0 left-0", className)}
      style={{ y }}
      ref={targetRef}
    >
      <div className=" text-white flex justify-center items-center flex-col gap-8 h-full w-full  min-h-[50vh]">
        <h2 className="mb-6 text-center text-4xl font-semibold md:text-6xl">
          {heading}
        </h2>
        <p className="mb-8 max-w-lg text-center text-sm md:text-base">
          {subheading}
        </p>
        <Button title="learn more" />
      </div>
    </motion.div>
  );
}

// eslint-disable-next-line react/prop-types
function Button({ title }) {
  return (
    <button className="flex items-center gap-2 rounded px-6 py-4 text-base font-medium uppercase text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 md:text-lg bg-violet-300 shadow-[4px_4px_0px_white] hover:shadow-[8px_8px_0px_white]">
      {title}
    </button>
  );
}

export default StickyCardsScreen;
