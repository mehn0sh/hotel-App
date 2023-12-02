import { useEffect } from "react";

export function useOutsideClick(ref, id, cb) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== id
      ) {
        cb();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, cb]);
}
