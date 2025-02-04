"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { TransitionGroup, CSSTransition } from "react-transition-group";

const AnimatedText = () => {
  const [index, setIndex] = useState(0);
  const words = ["Simplify", "Grow", "Manage", "Optimize"]; // Add more words as needed

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [words.length]);

  return (
    <h1 className="font-bold text-32 md:text-56 font-clashSemiBold">
      Your Complete Accounting Solution to{" "}
      <TransitionGroup component={null}>
        <CSSTransition
          key={words[index]}
          classNames="fade"
          timeout={500} // Match with CSS transition duration
        >
          <span className="text-gradient">{words[index]}</span>
        </CSSTransition>
      </TransitionGroup>{" "}
      your business
    </h1>
  );
};

export default AnimatedText;
