import React from "react";
import { useEffect, useState, useRef } from "react";
import { URL } from "../constants";
import RecentSearch from "./RecentSearch";
import QuestionandAnswer from "./QuestionandAnswer";
import Input from "./Input";
import Logo from "./Logo";
import ThemeDropDown from "./ThemeDropDown";

const Layout = () => {
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState([]);
  const [recentHistory, setRecentHistory] = useState(
    (JSON.parse(localStorage.getItem("history")) || []).filter(
      (item) => item && item.trim(),
    ),
  );
  const [selectedHistory, setSelectedHistory] = useState("");
  const scrollToAns = useRef();
  const [loader, setLoader] = useState(false);

  const askQuestion = async () => {
    const currentQuestion = question || selectedHistory;
    if (!currentQuestion || !currentQuestion.trim()) return;

    // Only update history if this is a new question (not from history click)
    if (question && question.trim()) {
      if (localStorage.getItem("history")) {
        let history = JSON.parse(localStorage.getItem("history")).filter(
          (item) => item && item.trim(),
        );
        history = [question.trim(), ...history];
        const seen = new Set();
        history = history.filter((item) => {
          const normalized = item.trim().toLowerCase();
          if (!seen.has(normalized)) {
            seen.add(normalized);
            return true;
          }
          return false;
        });
        history = history.map((item) => {
          const trimmed = item.trim();
          return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
        });
        if (history.length > 20) {
          history = history.slice(0, 20); // Keep only latest 20 entries
        }
        localStorage.setItem("history", JSON.stringify(history)); // Update localStorage
        setRecentHistory(history);
      } else {
        const capitalized =
          question.trim().charAt(0).toUpperCase() + question.trim().slice(1);
        localStorage.setItem("history", JSON.stringify([capitalized]));
        setRecentHistory([capitalized]);
      }
    }

    setQuestion(""); // Clear the input field immediately after sending

    const payload = {
      contents: [
        {
          parts: [
            {
              text: currentQuestion.trim(),
            },
          ],
        },
      ],
    };
    setLoader(true);
    let response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    response = await response.json();
    let dataString = response.candidates[0].content.parts[0].text;
    dataString = dataString.split("* ");
    dataString = dataString.map((item) => item.trim());

    setResult([
      ...result,
      { type: "q", text: currentQuestion.trim() },
      { type: "a", text: dataString },
    ]);
    setTimeout(() => {
      if (scrollToAns.current) {
        scrollToAns.current.scrollTop = scrollToAns.current.scrollHeight;
      }
    }, 100);
    setLoader(false);
  };

  const deleteHistoryItem = (itemToDelete) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${itemToDelete}" from history?`,
    );
    if (confirmDelete) {
      const updatedHistory = recentHistory.filter(
        (item) => item !== itemToDelete,
      );
      localStorage.setItem("history", JSON.stringify(updatedHistory));
      setRecentHistory(updatedHistory);
    }
  };

  useEffect(() => {
    if (selectedHistory) {
      // console.log("Selected History changed:", selectedHistory);
      askQuestion();
      setSelectedHistory(""); // Clear after processing
    }
  }, [selectedHistory]);

  //Dark mode feature
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <div className="grid grid-cols-5 h-screen text-center ">
        <RecentSearch
          recentHistory={recentHistory}
          setRecentHistory={setRecentHistory}
          setSelectedHistory={setSelectedHistory}
          deleteHistoryItem={deleteHistoryItem}
        />

        <div className="col-span-4 pt-5 ">
          <div className="border-b dark:border-zinc-700 border-zinc-300 pb-5 flex justify-between items-center px-10 relative">
            <div className=" top-8 left-8 dark:text-white text-zinc-700 text-2xl">
              <Logo />
            </div>
            <div>
              <h1 className="text-4xl mb-3 bg-clip-text dark:text-zinc-100 text-zinc-700 ">
                Hello User, Ask me anything!
              </h1>
            </div>
            <div className="">
              <ThemeDropDown theme={theme} setTheme={setTheme} />
            </div>
          </div>
          <div className="container h-[75vh] overflow-scroll no-scrollbar w-3/4 flex m-auto flex-col  ">
            {loader ? (
              <div className="flex justify-center items-center p-5">
                <div className="animate-spin rounded-full h-8 w-8 border-b-4  border-zinc-700 dark:border-zinc-300"></div>
              </div>
            ) : null}
            <div
              ref={scrollToAns}
              className="dark:text-zinc-300 text-zinc-800 h-full  overflow-scroll no-scrollbar overflow-x-hidden">
              {result.map((item, index) => (
                <QuestionandAnswer key={index} item={item} theme={theme} />
              ))}
            </div>
          </div>
          <Input
            question={question}
            setQuestion={setQuestion}
            askQuestion={askQuestion}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
