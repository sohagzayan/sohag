import { useCallback, useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Use useCallback to memoize the handler function
  const handleResize = useCallback(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    
    // Only run on client side
    if (typeof window === "undefined") return;

    // Set initial value
    handleResize();

    // Use the more modern way to add event listener
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    // Add event listener
    mediaQuery.addEventListener("change", handleResize);
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // Return false during SSR to prevent hydration mismatch
  return mounted ? isMobile : false;
}
