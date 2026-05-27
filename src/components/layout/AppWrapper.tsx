import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import { useLoading } from "../../hooks/useLoading";

interface AppWrapperProps {
  children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const { isLoading, revealApp } = useLoading();
  console.log("AppWrapper: render, isLoading =", isLoading, "revealApp =", revealApp);

  // Khóa cuộn trang bằng cách tác động trực tiếp lên CSS của HTML & Body khi đang tải
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen />
        )}
      </AnimatePresence>

      <div
        style={{
          opacity: revealApp ? 1 : 0,
          transition: "opacity 0.8s cubic-bezier(0.32, 0.72, 0, 1)",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </>
  );
}
