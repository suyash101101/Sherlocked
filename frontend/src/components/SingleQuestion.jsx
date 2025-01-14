import React, { useState } from "react";
import { BiMinus } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

export default function SingleQuestion({ question, answer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="border border-amber-100 rounded-lg bg-amber-100]">
      <article className="flex items-center justify-between p-4 lg:p-6">
        {/* Question */}
        <h2
          className="cursor-pointer text-amber-100 text-base lg:text-lg font-medium"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          {question}
        </h2>
        
        {/* Icons for expand/collapse */}
        <ul>
          {!showAnswer && (
            <li>
              <button onClick={() => setShowAnswer(true)}>
                <BsPlusLg className="text-amber-100 text-xl" />
              </button>
            </li>
          )}
          {showAnswer && (
            <li>
              <button onClick={() => setShowAnswer(false)}>
                <BiMinus className="text-amber-100 text-xl" />
              </button>
            </li>
          )}
        </ul>
      </article>

      {/* Answer section with conditional rendering */}
      <article
        className={`${
          showAnswer && "border-t border-[#d8d5b0] p-4 lg:p-6"
        } text-amber-100 text-sm lg:text-base`}
      >
        {showAnswer && <p>{answer}</p>}
      </article>
    </div>
  );
}
