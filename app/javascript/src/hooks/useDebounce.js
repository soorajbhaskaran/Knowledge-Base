import { useEffect } from "react";

const useDebounce = (value, trigerringFunction, delay = 350) => {
  useEffect(() => {
    const handler = setTimeout(() => trigerringFunction(), delay);

    return () => clearTimeout(handler);
  }, [value]);
};

export default useDebounce;
