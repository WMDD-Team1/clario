import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface FaqUnitContent {
  question: string;
  answer: string;
}

interface FaqUnitFormat {
  title: string;
  data: FaqUnitContent[];
}

export const FaqUnit = ({ title, data }: FaqUnitFormat) => {
  const [openIndex, setOpenIndex] = useState<number[]>([]);
  const toggleIndex = (index: number) => {
    setOpenIndex((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };
  return (
    <>
      <h3 className="text-[var(--primitive-colors-brand-primary-500-base)] text-3xl mb-[.5rem] mt-[2rem] font-extralight">
        {title}
      </h3>
      <div className="flex flex-row flex-wrap gap-[1rem]">
        {data.map((question, index) => (
          <div
            key={question.question}
            className="relative overflow-hidden basis-[45%] cursor-pointer"
            onClick={() => toggleIndex(index)}
          >
            <p className="p-[1rem] text-[var(--tertiary-text)] rounded-2xl border-2 border-[var(--primitive-colors-brand-primary-75)] text-left">
              {question.question}
            </p>

            <ChevronRight
              className={`absolute right-[1rem] top-[1.1rem] stroke-[var(--primitive-colors-brand-primary-95)] ${openIndex.includes(index) ? 'rotate-90' : 'rotate-0'} transition-all duration-300`}
            />
            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                openIndex.includes(index) ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="p-[1rem] text-[var(--tertiary-text)] rounded-2xl border-2 border-[var(--primitive-colors-brand-primary-75)] text-left mt-[.5rem] bg-[var(--primitive-colors-brand-primary-75)]">
                {question.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
