import { useEffect } from "react";

export default function useGetData(url, memo, setmemmo) {
  useEffect(() => {
    if (!url) return console.error("url not found");
    if (!memo.has(url)) {
      fetch(url)
        .then((r) => r.json())
        .then((data) => {
          setmemmo((prev) => {
            const newMemo = new Map(prev);
            newMemo.set(url, data);
            return newMemo;
          });
        });
    }
  }, [url, setmemmo]);
  return memo.get(url) || null;
}
