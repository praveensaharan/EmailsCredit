const CompanyNames = [
  "Airtel",
  "Pepperfry",
  "Antino",
  "Jar",
  "Deutsche CIB Centre Private Limited",
  "Atlassian",
  "Owens Corning",
  "Realme India",
  "Honeywell",
  "FIITJEE LTD",
  "OLA Electric",
  "True North",
  "Accenture Japan Ltd",
  "Maxlinear",
  "UiPath",
  "Piramal",
  "Airbus",
  "ION Group",
  "Infurnia Technologies",
  "Avendus Capital",
  "ICF Consulting",
  "QuillBot",
  "HiLabs Inc.",
  "Bain & Company",
  "Indeed",
  "Honda R&D",
  "Nineleaps",
  "Coupa Software India Pvt. Ltd.",
  "NoBroker Technologies",
  "SPECTRUM Techno Consultants Pvt Ltd",
  "Ninja cart",
  "Siemens Ltd.",
  "Unacademy",
  "Practo",
  "NXP Semiconductors",
  "Taiwan Semiconductor Manufacturing Company",
  "QUINTICS MANAGEMENT CONSULTANCIES PRIVATE LIMITED (Sutra Management)",
  "Sprinklr",
  "KLA Tencor",
  "Bajaj Auto Ltd",
  "Quince",
  "Adloid Technologies Pvt Ltd",
  "Schlumberger",
  "Cargill",
  "Rubrik",
  "Miebach Consulting India Pvt. Ltd.",
  "OPPO Mobiles India Pvt Ltd (Parent company of OnePlus)",
  "Robert Bosch Engineering and Business Solutions Private Limited",
  "Mresult",
  "SS&C Technologies",
  "Rapido bike",
  "Reliance Jio",
  "Increff",
  "Grant Thornton INDUS",
  "FanCode",
  "Microsoft",
  "FIS",
  "MX Player",
  "Ernst & Young LLP",
  "Axtria India Pvt Ltd",
  "Udaan",
  "Titan (Flock)",
  "Sleepiz",
  "Quasistatics Inc (10xAR)",
  "Niyo Solutions Inc",
  "Indian Political Action Committee (I-PAC)",
  "JSR Dynamics Private Limited",
  "Phable Care",
  "Rebel Foods",
  "Selec Controls Pvt. Ltd.",
  "Testbook",
  "Transorg Analytics",
  "Upstox",
  "Vantage Research",
  "Cadence",
  "Barclays India",
  "Acko",
  "Edgeverve Systems",
  "Razorpay",
  "TCS CSR",
  "Synergy Marine Group",
  "GulfTalent",
  "Quicksell",
  "Swiggy",
  "Futures First",
  "Quadeye (QE Securities LLP)",
  "Myntra",
  "Mavenir Systems Private Ltd India",
  "PayPal India",
  "Airblack",
  "Times Internet",
  "Brigosha",
  "Huawei Technologies",
  "Triveous",
  "Property Pistol Realty Pvt. Ltd",
  "Optum",
  "Apple",
  "Indus Insights",
  "ExxonMobil India",
  "Appinventiv",
  "Mediatek Tech Ltd",
  "Standard Chartered GBS",
  "Grofers India Pvt. Ltd.",
  "MindTickle",
  "ZS Associates",
  "Wheelseye",
  "Systems Limited",
  "IQVIA",
  "Capgemini Technology Services India Limited",
  "TVS Motor Company Ltd",
  "Lambda Supply Chain Solutions Pvt. Ltd.",
  "Zepto",
  "Nation with Namo",
  "Fare Labs",
  "Arthur D. Little",
  "Lokal",
  "Tata AIA Life Insurance Co Ltd",
  "Wipro",
  "QuantBox Research Pvt Ltd",
  "slice",
  "Capital Group",
  "Loyalytics Ai",
  "Astrome Technologies Private Limited",
  "Media.net",
  "Blackstone",
  "Atomberg Technologies",
  "Cirel Systems Pvt Ltd",
  "Games24x7 Pvt Ltd.",
];

import React, { useRef, useEffect, Suspense, useMemo, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Text, TrackballControls } from "@react-three/drei";
// import { DownOutlined } from "@ant-design/icons";
import { RiScrollToBottomLine } from "react-icons/ri";

// Define your colors
const colors = {
  background: "hsl(210, 100%, 6%)",
  foreground: "hsl(180, 100%, 90%)",
  accent: {
    DEFAULT: "hsl(198, 70%, 50%)",
  },
  destructive: {
    DEFAULT: "hsl(0, 98%, 44%)",
    foreground: "hsl(0, 0%, 100%)",
  },
};

function Word({ children, ...props }) {
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const over = (e) => {
    e.stopPropagation();
    setHovered(true);
  };

  const out = () => setHovered(false);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = "pointer";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  useFrame(() => {
    if (ref.current) {
      ref.current.material.color.lerp(
        color.set(hovered ? colors.destructive.DEFAULT : colors.foreground),
        0.1
      );
    }
  });

  return (
    <Billboard {...props}>
      <Text
        ref={ref}
        onPointerOver={over}
        onPointerOut={out}
        onClick={() => console.log("clicked")}
        {...fontProps}
      >
        {children}
      </Text>
    </Billboard>
  );
}

// Cloud Component
function Cloud({ count = 120, radius = 30 }) {
  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (Math.sqrt(count) + 1);
    const thetaSpan = (Math.PI * 2) / Math.sqrt(count);

    for (let i = 0; i < count; i++) {
      const word = CompanyNames[i % CompanyNames.length]; // Loop through the names
      const pos = new THREE.Vector3().setFromSpherical(
        spherical.set(
          radius,
          phiSpan * ((i % Math.sqrt(count)) + 1),
          thetaSpan * (i / Math.sqrt(count))
        )
      );
      temp.push([pos, word]);
    }
    return temp;
  }, [count, radius]);

  return words.map(([pos, word], index) => (
    <Word key={index} position={pos} children={word} />
  ));
}

export default function RandomWords() {
  // const scrollToContent = () => {
  //   window.scrollBy({ top: 1800, behavior: "smooth" });
  // };
  const scrollToContent = () => {
    window.scrollTo({
      top: 1800,
      behavior: "smooth",
    });
  };
  return (
    <>
      <section className="relative w-full h-screen bg-background">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 35], fov: 90 }}
          // style={{ background: colors.background }}
        >
          <fog attach="fog" args={[colors.background, 0, 80]} />
          <Suspense fallback={null}>
            <group rotation={[0, 0, 0]}>
              <Cloud count={120} radius={30} />
            </group>
          </Suspense>
          <TrackballControls />
        </Canvas>

        <button
          onClick={scrollToContent}
          className="absolute animate-bounce bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-destructive text-white rounded-lg shadow-lg hover:bg-[hsl(198,60%,40%)] transition-all cursor-pointer flex items-center gap-2"
        >
          <RiScrollToBottomLine className="text-4xl" />
        </button>
      </section>
    </>
  );
}
