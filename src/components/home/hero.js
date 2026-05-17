"use client";
import { useState, useEffect } from "react";

const slides = [
  { image: "/hero.jpg", label: "WELCOME" },
  { image: "/hero2.jpg", label: "WHAT WE DO" },
  { image: "/hero3.jpg", label: "WHY IT MATTERS" },
  { image: "/hero4.jpg", label: "WHAT WE SUPPORT" },
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-20 py-4 tracking-wide">
      <div className="relative text-white min-h-64 rounded-lg overflow-hidden">
        {/* ADDED - Render all slides, translate based on active index */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out ${index === activeSlide ? "slide-active" : ""}`}
            style={{
              backgroundImage: `url('${slide.image}')`,
              transform: `translateX(${(index - activeSlide) * 100}%)`,
            }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10 z-10" />
        {/* Content */}
        <div className="relative z-10 py-10 px-1 text-center mb-6">
          <p className="text-[#78a529] text-l font-bold mt-8">WELCOME TO</p>
          <div className="font-bold text-xl leading-tight">
            <h1 className="!mb-0">US Harmful Algal Bloom - Control</h1>
            <h1 className="!mt-2">Technologies Incubator Clearinghouse</h1>
          </div>
          <div className="text-l text-gray-200 max-w-xl mx-auto whitespace-nowrap">
            <p>
              A collection of HAB control regulations and permitting information
              to help
            </p>
            <p>users navigate algaecide use in marine and freshwater</p>
          </div>
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-4 px-8 py-4">
          {slides.map((slide, index) => (
            <div key={index} className="flex flex-col items-start flex-1 gap-1">
              <p
                className={`text-xs font-bold transition-opacity duration-800 ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
              >
                {slide.label}
              </p>
              <button
                onClick={() => setActiveSlide(index)}
                className={`w-full rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === index
                    ? "bg-white h-1"
                    : "bg-white opacity-40 h-0.5 hover:opacity-80 hover:h-1"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
