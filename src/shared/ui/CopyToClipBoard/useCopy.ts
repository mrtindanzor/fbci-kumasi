import { useCallback, useEffect, useRef, useState } from "react";

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const doCopy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  }, []);

  useEffect(() => {
    if (!copied) return;

    const timeoutId = timeoutRef.current;

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 5000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [copied]);

  return { copied, doCopy };
}
