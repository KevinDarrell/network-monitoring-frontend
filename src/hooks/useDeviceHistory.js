import { useEffect, useRef, useState } from "react";

export default function useDeviceHistory(status, historyLength, updateTrigger) {
  const history = useRef(Array(historyLength).fill("default"));
  const currentIndex = useRef(0);
  const [labelStatus, setLabelStatus] = useState("default");

  useEffect(() => {
    if (updateTrigger === 0) return;

    const newStatus =
      status === "UP" ? "up" : status === "DOWN" ? "down" : "default";

    history.current[currentIndex.current] = newStatus;
    setLabelStatus(newStatus);

    currentIndex.current = (currentIndex.current + 1) % historyLength;
  }, [updateTrigger, status, historyLength]);

  return { history: history.current, labelStatus };
}