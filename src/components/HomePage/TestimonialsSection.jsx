import React from "react";
import { Carousel } from "antd";

const testimonials = [
  {
    name: "Jane D.",
    title: "Marketing Manager",
    testimonial:
      "This service completely transformed my outreach strategy. I was able to connect with key decision-makers in just days!",
  },
  {
    name: "John S.",
    title: "HR Specialist",
    testimonial:
      "A game-changer for our recruitment process. We filled positions faster than ever before.",
  },
  // Add more testimonials as needed
];

const TestimonialsSection = () => {
  return (
    <div className="py-20 px-5 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-12">What Our Users Say</h2>
      <Carousel autoplay>
        {testimonials.map((item, index) => (
          <div key={index}>
            <p className="text-lg italic">"{item.testimonial}"</p>
            <h3 className="text-xl font-bold mt-4">{item.name}</h3>
            <p className="text-gray-600">{item.title}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestimonialsSection;
