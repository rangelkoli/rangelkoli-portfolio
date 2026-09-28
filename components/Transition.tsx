"use client";

import type { ReactNode } from "react";

export default function Transition({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div style={{ width: "100%" }} className={className}>
      {children}
    </div>
  );
}
