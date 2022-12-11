import React from "react";

export default function useStateReducer<T>(initialState: T) {
  return React.useReducer((state: T, newState: T) => {
    return { ...state, ...newState };
  }, initialState);
}
