"use client";

import { ThemeProvider } from "@/components/theme-provider";
import React, { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
        enableColorScheme={false}
      >
        {children}
      </ThemeProvider>
    </>
  );
}
