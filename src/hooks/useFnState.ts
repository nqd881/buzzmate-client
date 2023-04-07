import {useState} from "react";

export const useFnState = (initialFn: (...args: any[]) => any) => {
  const [myFunction, setMyFunction] = useState(() => initialFn);

  const setFunc = (fn: (...args: any[]) => any) => {
    setMyFunction(() => fn);
  };

  return [myFunction, setFunc];
};
