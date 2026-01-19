import React, { useState } from "react";

const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
  deleteHistoryItem,
}) => {
  const [showDelete, setShowDelete] = useState(null);

  const clearHistory = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all recent history? This action cannot be undone.",
    );

    if (confirmDelete) {
      localStorage.removeItem("history");
      setRecentHistory([]);
    }
  };
  const mouseLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowDelete(null);
    }
  };
  return (
    <>
      <div className="col-span-1 dark:bg-zinc-900 bg-gray-50 border-r dark:border-zinc-700 border-gray-200 h-screen p-5 flex flex-col justify-between">
        <div>
          <h1 className="text-xl p-5 dark:text-white text-zinc-700 pt-3 flex justify-between items-center  dark:border-zinc-700 mb-3">
            <span>Recent Search</span>
            <button
              className="cursor-pointer dark:text-zinc-300 text-zinc-700"
              onClick={clearHistory}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="22px"
                viewBox="0 -960 960 960"
                width="22px"
                fill="currentColor">
                <path d="M312-696v480-480Zm139 552H312q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v149q-18-3-36-4.5t-36 .5v-145H312v479.63h106.17Q423-197 431.5-179q8.5 18 19.5 35Zm-67-144h24q0-70 24-111l24-41v-184h-72v336Zm120-204q14-11 32.5-22.5T576-534v-90h-72v132ZM671.77-96Q592-96 536-152.23q-56-56.22-56-136Q480-368 536.23-424q56.22-56 136-56Q752-.8 808-.8q-.8-.8-.8-.8z" />
              </svg>
            </button>
          </h1>
        </div>
        <div className="overflow-auto h-[85vh] no-scrollbar">
          <ul className="text-left overflow-hidden text-sm ">
            {recentHistory &&
              recentHistory.map((item, index) => (
                <li
                  key={index + Math.random()}
                  className="group relative p-1 pl-5 py-2 text-left dark:text-zinc-400 text-zinc-700 dark:hover:bg-zinc-700 hover:bg-zinc-200 cursor-pointer hover:rounded-xl"
                  onClick={() => {
                    if (showDelete !== index) {
                      setSelectedHistory(item);
                    }
                  }}
                  onMouseLeave={mouseLeave}>
                  <div className="flex justify-between items-center">
                    <span className="truncate">{item}</span>
                    <div className="relative">
                      <button
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-zinc-300 dark:hover:bg-zinc-500 relative"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDelete((prev) =>
                            prev === index ? null : index,
                          );
                        }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <circle cx="12" cy="6" r="2" />
                          <circle cx="12" cy="12" r="2" />
                          <circle cx="12" cy="18" r="2" />
                        </svg>
                        {showDelete === index && (
                          <div
                            className={`absolute right-0 ${
                              index === 0 ? "top-full mt-1" : "bottom-full mb-1"
                            } bg-white dark:bg-zinc-800 border dark:border-zinc-600 rounded-2xl shadow-lg z-20 min-w-24`}>
                            <button
                              className="block w-full text-left px-3 py-2 text-sm dark:text-zinc-200 text-zinc-700 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-2xl"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteHistoryItem(item);
                                setShowDelete(null);
                              }}>
                              Delete
                            </button>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecentSearch;
