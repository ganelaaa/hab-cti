"use client";

import { useEffect, useState } from "react";
import InternalPageHero from "@/components/InternalPageHero";
import { getFaqPageFields } from "@/lib/cms";

export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFaqs() {
      const fields = await getFaqPageFields();

      if (!fields) {
        setFaqs([]);
        setLoading(false);
        return;
      }

      const cmsFaqs = [
        {
          question: fields.faq01Question,
          answer: fields.faq01Answer,
        },
        {
          question: fields.faq02Question,
          answer: fields.faq02Answer,
        },
        {
          question: fields.faq03Question,
          answer: fields.faq03Answer,
        },
        {
          question: fields.faq04Question,
          answer: fields.faq04Answer,
        },
        {
          question: fields.faq05Question,
          answer: fields.faq05Answer,
        },
        {
          question: fields.faq06Question,
          answer: fields.faq06Answer,
        },
        {
          question: fields.faq07Question,
          answer: fields.faq07Answer,
        },
      ].filter((faq) => faq.question && faq.answer);

      setFaqs(cmsFaqs);
      setActiveIndex(0);
      setLoading(false);
    }

    loadFaqs();
  }, []);

  return (
    <div className="px-4 tracking-wide sm:px-10 lg:px-20">

      {loading ? (
        <div className="mt-16 text-center text-gray-500">
          Loading FAQs...
        </div>
      ) : faqs.length === 0 ? (
        <div className="mt-16 text-center text-gray-500">
          FAQ content is currently unavailable.
        </div>
      ) : (
        <div className="mt-16 flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {/* Left: Questions */}
          <div className="flex w-full shrink-0 flex-col gap-3 lg:w-[38rem]">
            {faqs.map((faq, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-lg px-5 py-4 text-left text-sm transition-all duration-200 ${
                  activeIndex === index
                    ? "bg-primary font-semibold text-white"
                    : "bg-primary-lighter text-gray-700 hover:bg-primary hover:text-white"
                }`}
              >
                {faq.question}
              </button>
            ))}
          </div>

          {/* Right: Selected Answer */}
          <div className="min-w-0 flex-1 rounded-lg bg-primary p-8 text-white">
            <h2 className="mb-4 text-3xl !font-semibold text-white">
              {faqs[activeIndex].question}
            </h2>

            <div
              className="
                !text-xl
                leading-relaxed
                text-white

                [&_p]:mb-4
                [&_p]:!text-xl
                [&_p]:!text-white
                [&_p:last-child]:mb-0

                [&_ul]:my-4
                [&_ul]:list-disc
                [&_ul]:pl-6

                [&_ol]:my-4
                [&_ol]:list-decimal
                [&_ol]:pl-6

                [&_li]:mb-1
                [&_li]:text-white

                [&_strong]:font-bold
                [&_strong]:text-white

                [&_b]:font-bold
                [&_b]:text-white

                [&_em]:italic
                [&_em]:text-white

                [&_i]:italic
                [&_i]:text-white

                [&_a]:!text-white
                [&_a]:!underline
                [&_a]:cursor-pointer
                [&_a]:decoration-1
                [&_a]:underline-offset-4
                [&_a:visited]:!text-white
                [&_a:hover]:!text-white
                [&_a:hover]:decoration-2
                [&_a:focus]:!text-white"
              dangerouslySetInnerHTML={{
                __html: faqs[activeIndex].answer,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}