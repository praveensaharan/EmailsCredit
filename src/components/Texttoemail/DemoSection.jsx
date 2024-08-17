import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faCog,
  faEye,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

const DemoSection = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    let timer;
    if (step === 2) {
      timer = setTimeout(() => {
        setStep(3);
      }, 3000);
    }
    if (step === 1) {
      timer = setTimeout(() => {
        setStep(2);
      }, 3000);
    }
    if (step === 3) {
      timer = setTimeout(() => {
        setStep(4);
      }, 3000);
    }
    if (step === 4) {
      timer = setTimeout(() => {
        setStep(1);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div className="bg-[#CCCCCC] py-20 text-black">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold mb-10">How It Works</h2>
        <div className="mt-12 bg-transparent max-w-4xl mx-auto">
          <div className="relative mx-auto border-black bg-black border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
            <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white">
              <div className="flex justify-center items-center h-full">
                <div className="w-full p-8">
                  <h3 className="text-2xl font-bold mb-6 text-black">Demo</h3>
                  {step === 1 && (
                    <div className="flex flex-col items-center">
                      <div className="w-full p-4 mb-4">
                        <div className="border-dashed border-2 border-black p-6 rounded-lg bg-[#CCCCCC]">
                          <p className="text-sm text-black text-center">
                            Upload your image here
                          </p>
                        </div>
                      </div>
                      <button
                        className="bg-[#FF6600] text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
                        onClick={() => setStep(2)}
                      >
                        Process
                      </button>
                    </div>
                  )}
                  {step === 2 && (
                    <div className="flex flex-col items-center">
                      <p className="text-sm mb-4 text-black">Processing...</p>
                      <FontAwesomeIcon
                        icon={faCog}
                        size="3x"
                        className="text-[#FF6600] animate-spin"
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="flex flex-col items-center">
                      <div className="w-full p-4 mb-4">
                        <div className="border-2 border-black p-6 rounded-lg bg-[#CCCCCC]">
                          <p className="text-sm text-black">
                            Extracted Company Names:
                          </p>
                          <ul className="list-disc list-inside text-sm text-black">
                            <li>Amazon</li>
                          </ul>
                          <p className="text-sm text-black mt-4 mb-2">
                            Extracted Emails:
                          </p>
                          <ul className="list-disc list-inside text-sm text-black">
                            <li>elias.liye@amazon.com</li>
                            <li>shurti.jai@amazon.com</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className="flex flex-col items-center">
                      <div className="w-full p-4 mb-4">
                        <div className="border-2 border-black p-6 rounded-lg bg-[#CCCCCC]">
                          <p className="text-sm text-black mb-2">
                            Manage Extracted Data:
                          </p>
                          <div className="flex justify-around">
                            <div className="text-center">
                              <FontAwesomeIcon
                                icon={faExchangeAlt}
                                size="2x"
                                className="text-[#FF6600] mb-2"
                              />
                              <p className="text-sm text-black">
                                Transfer data from MongoDB to SQL if valid
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto bg-black rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-black"></div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 text-left max-w-4xl mx-auto mt-20">
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <FontAwesomeIcon
              icon={faUpload}
              size="3x"
              className={`text-[#FF6600] mb-4 ${
                step === 1 ? "animate-bounce" : ""
              }`}
            />
            <p className="text-lg font-semibold">Step 1</p>
            <p className="text-sm text-black">
              Upload an image or paste text into the input area.
            </p>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center">
            <FontAwesomeIcon
              icon={faCog}
              size="3x"
              className={`text-[#FF6600] mb-4 ${
                step === 2 ? "animate-spin" : ""
              }`}
            />
            <p className="text-lg font-semibold">Step 2</p>
            <p className="text-sm text-black">
              Click "Process" to extract and verify company names and emails.
            </p>
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center">
            <FontAwesomeIcon
              icon={faEye}
              size="3x"
              className={`text-[#FF6600] mb-4 ${
                step === 3 ? "animate-pulse" : ""
              }`}
            />
            <p className="text-lg font-semibold">Step 3</p>
            <p className="text-sm text-black">
              View the processed results on the same page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
