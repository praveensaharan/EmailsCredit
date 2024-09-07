import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const FadeInSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Animation triggers only once
    threshold: 0.1, // Section enters when 10% visible
  });

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-[2000ms] ease-in-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInSection;
