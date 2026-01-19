import React from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  github,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const QuestionandAnswer = ({ item, index, theme }) => {
  const isDark = theme === "dark";
  const codeTheme = isDark ? atomOneDark : github;

  const renderer = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          style={codeTheme}
          preTag="pre"
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };
  return (
    <>
      <div
        key={`${item.type}-${index}`}
        className={item.type === "q" ? "mt-5 flex justify-end" : "text-left"}>
        {item.type === "q" ? (
          <p className="text-right p-1 border-8 dark:bg-zinc-700 bg-gray-100 dark:border-zinc-700 border-gray-100 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl w-fit  ">
            {" "}
            {item.text}
          </p>
        ) : (
          <div className="text-left">
            {item.text &&
              item.text.map((ans, idx) => (
                <div key={`ans-${index}-${idx}`} className="text-left p-1 mb-2">
                  <div className="prose prose-sm max-w-none dark:prose-invert leading-loose">
                    <ReactMarkdown components={renderer}>{ans}</ReactMarkdown>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionandAnswer;
