"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Header(props: { title: string }) {
  const Ref = useRef(null);
  const inView = useInView(Ref, { amount: 0.5, once: false });
  const animationOnViewLeft = {
    hidden: {
      scaleX: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
      },
    },
  };
  const animationOnViewRight = {
    hidden: {
      scaleX: 0,
      transition: {
        duration: 0.5,
      },
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
      },
    },
  };
  return (
    <motion.div
      className="flex flex-col justify-evenly text-white font-striger  w-max "
      ref={Ref}
    >
      <div className="flex flex-row justify-between">
        <motion.span
          variants={animationOnViewLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[url('/heading-top-left.svg')] bg-contain bg-center bg-no-repeat w-[35%] origin-right"
        ></motion.span>
        <span className="lg:text-6xl sm:text-4xl text-4xl">The</span>
        <motion.span
          variants={animationOnViewRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[url('/heading-top-right.svg')] bg-contain bg-center bg-no-repeat w-[35%] origin-left"
        ></motion.span>
      </div>
      <div className="lg:text-8xl sm:text-6xl text-5xl mx-auto">
        {props.title}
      </div>
      <div className="flex flex-row justify-between">
        <motion.span
          variants={animationOnViewLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[url('/heading-bottom-left.svg')] bg-contain bg-center bg-no-repeat w-[35%] origin-right"
        ></motion.span>
        <span className="lg:text-6xl sm:text-4xl text-4xl">Team</span>
        <motion.span
          variants={animationOnViewRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-[url('/heading-bottom-right.svg')] bg-contain bg-center bg-no-repeat w-[35%] origin-left"
        ></motion.span>
      </div>
    </motion.div>
  );
}
