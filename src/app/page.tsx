"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import React from "react";

const Home = () => {
  const [quote, setQuote] = useState<{
    content: string;
    author: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Using Promise.race to timeout after 3 seconds
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), 3000)
      );

      const fetchPromise = fetch(
        "https://api.quotable.io/random?tags=business|success|wisdom"
      );

      const response = await Promise.race([fetchPromise, timeoutPromise]);
      if (
        !response ||
        !("ok" in (response as Response)) ||
        !(response as Response).ok
      )
        throw new Error("Failed to fetch quote");
      const data = await (response as Response).json();
      setQuote(data);
    } catch (err) {
      setError("Failed to load quote. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen p-4"
      suppressHydrationWarning
    >
      {quote ? (
        <>
          <p className="text-center font-bold text-sm text-gray-500">
            Shrit1401
          </p>
          <h1 className="text-center font-bold text-3xl md:text-5xl lg:text-4xl max-w-4xl">
            {quote.content}
          </h1>
          <h3
            onClick={fetchQuote}
            className="mt-4 font-semibold text-center text-lg sm:text-lg lg:text-2xl text-gray-500 flex flex-row items-center cursor-pointer gap-3"
          >
            {quote.author}{" "}
            {isLoading && <RefreshCcw className="animate-spin" />}
          </h3>
        </>
      ) : (
        <h1 className="text-center font-bold text-3xl sm:text-4xl lg:text-3xl max-w-4xl">
          {isLoading ? "Loading quote..." : error}
        </h1>
      )}
    </div>
  );
};

export default Home;
