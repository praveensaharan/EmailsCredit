import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Input, message as antdMessage } from "antd";
import { useDropzone } from "react-dropzone";
import { useSession } from "@clerk/clerk-react";
import ConditionalComponent from "./Response";
import DemoSection from "./DemoSection";
const { Title, Text } = Typography;
const { TextArea } = Input;
const Baseurl = "https://s3-to-emai.vercel.app";

const Home = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imagePasted, setImagePasted] = useState(false);
  const [textDisabled, setTextDisabled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [responseDatatext, setResponseDatatext] = useState(false);
  const [responseDataimage, setResponseDataimage] = useState(false);
  const [imageResponse, setImageResponse] = useState({});
  const [textResponse, setTextResponse] = useState({});
  const { session } = useSession();

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setImagePasted(false);
      setTextDisabled(true);
      antdMessage.success(`${file.name} file uploaded successfully`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (session && (text || image)) {
      try {
        const token = await session.getToken();
        if (text) {
          const response = await axios.post(
            `${Baseurl}/upload/text`,
            { text },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTextResponse(response.data);
          setResponseDatatext(true);
          console.log(response.data);
        }

        if (image) {
          const formData = new FormData();
          formData.append("image", image);

          const response = await axios.post(
            `${Baseurl}/upload/image`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setImageResponse(response.data);
          setResponseDataimage(true);
          console.log(response.data);
        }

        setText("");
        setImage(null);
        setImagePreview(null);
        setImagePasted(false);
        setTextDisabled(false);
        setFormSubmitted(true);
      } catch (error) {
        antdMessage.error(
          "An error occurred. Maybe there is no email in that."
        );
        console.error("Error:", error);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const handlePaste = useCallback((event) => {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          setImage(file);
          setImagePreview(URL.createObjectURL(file));
          setImagePasted(true);
          setTextDisabled(true);
          antdMessage.success("Image pasted successfully");
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  useEffect(() => {
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-lightgray pt-2 pb-4 sm:pt-2 sm:pb-20 mt-2">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
          <Title level={2} className="mb-2 sm:mb-4 text-center text-black">
            Send a Message or Image
          </Title>
          <Text className="text-center mb-2 sm:mb-4 text-black">
            Please fill in the details below to send your message or image
          </Text>
          <form onSubmit={handleSubmit}>
            <div
              {...getRootProps()}
              className={`p-2 sm:p-4 border-2 border-dashed rounded-lg ${
                isDragActive ? "border-orange" : "border-gray-300"
              } mb-2 sm:mb-4`}
            >
              {!text && <input {...getInputProps()} />}
              {isDragActive ? (
                <p className="text-center text-black">
                  Drop the files here ...
                </p>
              ) : (
                <p className="text-center text-black">
                  Drag & drop an image here, or click to select an image
                </p>
              )}
            </div>
            {imagePreview && (
              <div className="mb-2 sm:mb-4 flex justify-center">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-20 h-auto"
                />
              </div>
            )}
            <TextArea
              rows={4}
              placeholder="Type a message or paste an image that contains an email"
              value={text}
              onChange={handleTextChange}
              disabled={imagePreview || imagePasted}
              className="mb-2 sm:mb-4"
            />
            {imagePasted && (
              <Text className="text-orange text-sm mb-2">
                Image pasted from clipboard
              </Text>
            )}
            <div className="w-full flex justify-center">
              <button
                htmlType="submit"
                disabled={formSubmitted}
                className="w-full text-white bg-orange hover:bg-black hover:text-white rounded-xl px-4 py-2 transition duration-300 ease-in-out font-bold"
              >
                Send
              </button>
            </div>
          </form>
          <div className="flex mt-2 sm:mt-4">
            <div>
              {responseDatatext && (
                <ConditionalComponent
                  url={null}
                  results={textResponse.results}
                />
              )}
            </div>
            <div>
              {responseDataimage && (
                <ConditionalComponent
                  url={imageResponse.url}
                  results={imageResponse.results}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex pt-4 bg-lightgray justify-center">
        <DemoSection />
      </div>
    </>
  );
};

export default Home;
