import React from "react";

const Input = ({ question, setQuestion, askQuestion }) => {
  return (
    <>
      <div className="dark:bg-zinc-700 bg-white w-3/4 p-1 dark:text-white text-zinc-800 m-auto rounded-4xl border-zinc-700 border flex h-16 position-fixed bottom-5 left-0 right-0 ">
        <input
          type="text"
          className="w-full h-full p-3 outline-none"
          placeholder="Ask me anything..."
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              askQuestion();
            }
          }}
        />
        <button
          onClick={askQuestion}
          className={`cursor-pointer ${
            !question.trim() ? "opacity-50 cursor-not-allowed " : ""
          }dark:text-zinc-300 text-zinc-700 mr-5`}
          disabled={!question.trim()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="currentColor">
            <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Input;
