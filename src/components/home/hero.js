// "use client";
// import { useState, useEffect } from "react";

// export default function Hero({ cms }) {
//   // Reconstruct your array on the fly from your flat WordPress ACF custom fields
//   const slides = [
//     {
//       image: cms?.slide1Image?.node?.sourceUrl || "/hero.jpg",
//       label: cms?.slide1Label || "WELCOME",
//       description: [
//         cms?.slide1Line1 || "Harmful Algal Bloom Control",
//         cms?.slide1Line2 || "Technologies & Regulatory Logistics"
//       ],
//     },
//     {
//       image: cms?.slide2Image?.node?.sourceUrl || "/hero2.jpg",
//       label: cms?.slide2Tag || "WHAT WE DO",
//       tag: cms?.slide2Tag || "US HAB CTRL",
//       title: cms?.slide2Title || "What We Do",
//       description: [
//         cms?.slide2Description01 || "The US HAB CTRL helps simplify the regulatory process around harmful algal bloom (HAB) control.",
//         cms?.slide2Description02 || "We make it easier for researchers, agencies, and industry stakeholders to understand permitting requirements, reduce delays and uncertainties early in development, and access information on safe, approved products - all in one place."
//       ].filter(Boolean),
//     },
//     {
//       image: cms?.slide3Image?.node?.sourceUrl || "/hero3.jpg",
//       label: cms?.slide3Tag || "WHY IT MATTERS",
//       tag: cms?.slide3Tag || "US HAB CTRL",
//       title: cms?.slide3Title || "Why It Matters",
//       description: [
//         cms?.slide3Description01 || "By improving transparency and clarity in the permitting process, the HAB control supports faster, safer, and more informed decision-making.",
//         cms?.slide3Description02 || "This reduces time, costs, and confusion for industries and researchers working on HAB solutions."
//       ].filter(Boolean),
//     },
//     {
//       image: cms?.slide4Image?.node?.sourceUrl || "/hero4.jpg",
//       label: cms?.slide4Tag || "WHAT WE SUPPORT",
//       tag: cms?.slide4Tag || "US HAB CTRL",
//       title: cms?.slide4Title || "What We Support",
//       description: [
//         cms?.slide4Description01 || "We aim to help users make informed decisions about HAB control by sharing guidance on when and how approved products may be used.",
//         cms?.slide4Description02 || "While the platform doesn't claim to cover everything, it provides a strong starting point rooted in current best practices and available regulatory insights."
//       ].filter(Boolean),
//     },
//   ];

//   const [activeSlide, setActiveSlide] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setActiveSlide((prev) => (prev + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   const slide = slides[activeSlide];

//   return (
//     <div className="px-20 py-4 tracking-wide">
//       <div className="relative text-white h-85 rounded-lg overflow-hidden">
//         {slides.map((s, index) => (
//           <div
//             key={index}
//             className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out"
//             style={{
//               backgroundImage: `url('${s.image}')`,
//               transform: `translateX(${(index - activeSlide) * 100}%)`,
//             }}
//           />
//         ))}

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black opacity-10 z-10" />

//         {/* Welcome slide */}
//         {activeSlide === 0 && (
//           <div className="relative z-10 py-10 px-1 text-center mb-6">
//             <p className="text-[#78a529] text-l font-bold mt-5">{slide.label}</p>
//             <div className="font-bold text-xl leading-tight relative w-fit mx-auto after:absolute after:bottom-[-10px] after:left-0 after:w-full after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white after:to-transparent">
//               <h1 className="!mb-0">{slide.description[0]}</h1>
//               <h3 className="!mt-2">{slide.description[1]}</h3>
//             </div>
//           </div>
//         )}

//         {/* Other dynamic content slides */}
//         {activeSlide !== 0 && (
//           <div className="relative z-10 py-8 px-8 mb-6">
//             <p className="text-[#78a529] font-bold text-sm">{slide.tag}</p>
//             <h1 className="font-bold !mt-1 !mb-3">{slide.title}</h1>
//             {slide.description.map((paragraph, i) => (
//               <p
//                 key={i}
//                 className={`text-gray-200 max-w-sm text-sm ${i > 0 ? "mt-3" : ""}`}
//               >
//                 {paragraph}
//               </p>
//             ))}
//           </div>
//         )}

//         {/* Slide indicators */}
//         <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-4 px-8 py-4">
//           {slides.map((s, index) => (
//             <div key={index} className="flex flex-col items-start flex-1 gap-1">
//               <p
//                 className={`text-xs font-bold transition-opacity duration-800 ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
//               >
//                 {s.label}
//               </p>
//               <button
//                 onClick={() => setActiveSlide(index)}
//                 className={`w-full rounded-full transition-all duration-300 cursor-pointer ${
//                   activeSlide === index
//                     ? "bg-white h-1"
//                     : "bg-white opacity-40 h-0.5 hover:opacity-80 hover:h-1"
//                 }`}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";

export default function Hero({ slidesList = [] }) {
  // 1. Programmatically map the WordPress payload to your slide structure
  const slides = slidesList.map((post) => {
    const fields = post.slideConnector || {};
    return {
      image: fields.slideImage?.node?.sourceUrl || "/hero.jpg",
      label: fields.slideLabel || "WELCOME",
      tag: fields.slideTag || "US HAB CTRL",
      title: fields.slideTitle || post.title,
      isWelcome: fields.isWelcomeSlide || false,
      // 2. FIXED: Grabs the WYSIWYG payload directly
      htmlBody: fields.slideDescription01 || "",
    };
  });

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides || slides.length === 0) {
    return (
      <div className="px-20 py-10 text-center italic text-gray-500">
        No slides configured.
      </div>
    );
  }

  const slide = slides[activeSlide];

  return (
    <div className="px-20 py-4 tracking-wide">
      <div className="relative text-white h-85 rounded-lg overflow-hidden">
        {slides.map((s, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${s.image}')`,
              transform: `translateX(${(index - activeSlide) * 100}%)`,
            }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-10 z-10" />

        {/* Dynamic Welcome Slide Layout (Centered) */}
        {slide.isWelcome && (
          <div className="relative z-10 py-10 px-4 text-center mb-6 w-full flex flex-col items-center mt-[-20px]">
            {/* Top Green Label */}
            <p className="text-[#78a529] text-sm md:text-base font-bold uppercase tracking-widest mb-3">
              {slide.label}
            </p>

            <div className="relative w-fit mx-auto pb-6 px-4">
              {/* 1. The missing US-HABCTI Title injected here */}
              {slide.title && (
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
              )}

              {/* 2. Your WYSIWYG Description text */}
              <div
                className="text-lg md:text-xl font-bold text-white max-w-4xl mx-auto space-y-4 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: slide.htmlBody }}
              />

              {/* 3. The independent underline that won't strike through paragraph tags */}
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          </div>
        )}

        {/* Dynamic Content Slide Layout (Left-Aligned) */}
        {!slide.isWelcome && (
          <div className="relative z-10 py-8 px-8 mb-6">
            <p className="text-[#78a529] font-bold text-sm">{slide.tag}</p>
            <h1 className="font-bold !mt-1 !mb-3">{slide.title}</h1>
            {/* 4. FIXED: Injects HTML and handles paragraph spacing automatically */}
            <div
              className="text-gray-200 max-w-sm text-sm space-y-3 dynamic-slide-content"
              dangerouslySetInnerHTML={{ __html: slide.htmlBody }}
            />
          </div>
        )}

        {/* Slide Indicators Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-4 px-8 py-4">
          {slides.map((s, index) => (
            <div key={index} className="flex flex-col items-start flex-1 gap-1">
              <p
                className={`text-xs font-bold transition-opacity duration-800 ${activeSlide === index ? "opacity-100" : "opacity-0"}`}
              >
                {s.label}
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
