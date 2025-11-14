"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const iconVariants = {
    initial: { rotate: -90, opacity: 0, scale: 0.9 },
    animate: { rotate: 0, opacity: 1, scale: 1 },
    exit: { rotate: 90, opacity: 0, scale: 0.9 },
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="relative rounded-full"
    >
      {mounted ? (
        <AnimatePresence initial={false} mode="wait">
          {resolvedTheme === "dark" ? (
            <motion.span
              key="moon"
              className="flex items-center justify-center"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Moon className="h-5 w-5" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              className="flex items-center justify-center"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Sun className="h-5 w-5" />
            </motion.span>
          )}
        </AnimatePresence>
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}

