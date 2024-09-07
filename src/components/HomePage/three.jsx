import React, { useRef, useState } from "react";

import Table1 from "./Additional/Table";

export default function ThreeScene() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 w-full flex flex-col lg:flex-row bg-background">
        <div
          className="lg:w-2/5 w-full p-4 flex items-center justify-center text-foreground text-4xl lg:text-6xl font-bold leading-tight overflow-hidden"
          style={{
            wordBreak: "break-word",
            padding: "20px",
          }}
        >
          "Effortlessly manage referral emails and customize responses using AI,
          all directly from our platform."
        </div>
        <div className="lg:w-3/5 w-full overflow-auto p-4 lg:p-10">
          <Table1 />
        </div>
      </div>
    </div>
  );
}
