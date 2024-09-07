import React from "react";
import Hero from "./Hero";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import FeaturesSection from "./FeaturesSection";
import FadeInSection from "./FadeInSection";
import Three1 from "./three";
import Random from "./random";
import Cool3 from "./Additional/Cool3";
import ZoomTransition from "./Additional/ZoomTransition";

const Home = () => {
  return (
    <>
      <Hero />
      <div style={{ width: "100vw", height: "110vh" }}>
        <Three1 />
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Random />
      </div>

      {/* <Cool3 />
      <FadeInSection>
        <HowItWorksSection />
      </FadeInSection> */}

      <PricingSection />
    </>
  );
};

export default Home;
