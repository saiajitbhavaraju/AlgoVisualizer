"use client";
import React, { useState, useEffect } from "react";
import { mergeSort } from "./Mergesort"; // Import the modified merge sort function

const ANIMATION_SPEED_MS = 1;
const BARS = 250;
const PRIMARY_COLOR = "bg-cyan-400";
const SECONDARY_COLOR = "bg-red-500";

export const Hero = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  const resetArray = () => {
    const newArray = Array.from({ length: BARS }, () => Math.floor(Math.random() * 450) + 5);
    setArray(newArray);
    console.log(newArray); // Log the new array to the console
  };

  const mergeSortAnimation = async () => {
    setIsSorting(true);
    const steps = mergeSort(array);
    for (let i = 0; i < steps.length; i++) {
      const [barOneIdx, barTwoIdx, newHeight] = steps[i];
      const arrayBars = document.getElementsByClassName('array-bar') as HTMLCollectionOf<HTMLElement>;
      if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
        setTimeout(() => {
          arrayBars[barOneIdx].classList.add(SECONDARY_COLOR);
          arrayBars[barTwoIdx].classList.add(SECONDARY_COLOR);
          arrayBars[barOneIdx].style.height = `${newHeight}px`;
          arrayBars[barTwoIdx].classList.remove(SECONDARY_COLOR);
          arrayBars[barOneIdx].classList.remove(SECONDARY_COLOR);
        }, i * ANIMATION_SPEED_MS);
      }
    }
    setIsSorting(false);
  };

  useEffect(() => {
    resetArray(); // Generate array when component mounts
  }, []);

  return (
    <div>
      <button onClick={resetArray} disabled={isSorting} className="m-2 p-2 bg-blue-500 text-white rounded">Reset Array</button>
      <button onClick={mergeSortAnimation} disabled={isSorting} className="m-2 p-2 bg-green-500 text-white rounded">Merge Sort</button>
      <div className="array-container flex justify-center items-end h-[70vh] py-4">
        {array.map((value, idx) => (
          <div
            className="array-bar bg-cyan-400 mx-0.5 min-w-0.5"
            key={idx}
            style={{
              height: `${value}px`,
              width: `${100 / BARS}%`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};