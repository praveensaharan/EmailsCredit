import React from "react";
import Hero from "./Hero";
import HowItWorksSection from "./HowItWorksSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import FeaturesSection from "./FeaturesSection";
import FadeInSection from "./FadeInSection";
import Three1 from "./three";
import Random from "./random";

const Home = () => {
  return (
    <>
      <Hero />
      <div style={{ width: "100vw", height: "100vh" }}>
        <Three1 />
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Random />
      </div>
      <FadeInSection>
        <HowItWorksSection />
      </FadeInSection>
      <FadeInSection>
        <TestimonialsSection />
      </FadeInSection>
      <FadeInSection>
        <PricingSection />
      </FadeInSection>
      <FadeInSection>
        <FeaturesSection />
      </FadeInSection>
    </>
  );
};

export default Home;

// import { useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { ScrollContainer, Scene } from "./Text";
// import Hero from "./Hero";
// import HowItWorksSection from "./HowItWorksSection";
// import TestimonialsSection from "./TestimonialsSection";
// import PricingSection from "./PricingSection";
// import FeaturesSection from "./FeaturesSection";
// import FadeInSection from "./FadeInSection";
// import Three1 from "./three";
// import Random from "./random";

// function Home() {
//   const scrollRef = useRef();
//   const scroll = useRef(0);

//   return (
//     <>
//       {/* Hero Section */}
//       <Hero />

//       {/* 3D Scene One */}
//       <section className="relative w-full h-screen">
//         <Three1 />
//       </section>

//       {/* Random Content Section */}
//       <section className="relative w-full h-screen">
//         <Random />
//       </section>

//       {/* How It Works Section with fade-in effect */}
//       <FadeInSection>
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <HowItWorksSection />
//           </div>
//         </section>
//       </FadeInSection>

//       {/* Testimonials Section */}
//       <FadeInSection>
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <TestimonialsSection />
//           </div>
//         </section>
//       </FadeInSection>

//       {/* Pricing Section */}
//       <FadeInSection>
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-4">
//             <PricingSection />
//           </div>
//         </section>
//       </FadeInSection>

//       {/* Features Section */}
//       <FadeInSection>
//         <section className="py-16 bg-white">
//           <div className="container mx-auto px-4">
//             <FeaturesSection />
//           </div>
//         </section>
//       </FadeInSection>
//     </>
//   );
// }

// export default Home;
