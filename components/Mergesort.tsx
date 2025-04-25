"use client";

export const mergeSort = (array: number[]): number[][] => {
  const steps: number[][] = [];
  if (array.length <= 1) return steps;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, steps);
  return steps;
};

const mergeSortHelper = (
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  steps: number[][]
) => {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, steps);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, steps);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, steps);
};

const doMerge = (
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  steps: number[][]
) => {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    steps.push([i, j]);
    steps.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      steps.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      steps.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    steps.push([i, i]);
    steps.push([i, i]);
    steps.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    steps.push([j, j]);
    steps.push([j, j]);
    steps.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
};