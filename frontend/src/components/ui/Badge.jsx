// src/components/ui/Badge.jsx
import React from "react";

// simple utility for joining classes
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ className = "", children, variant = "default", ...props }) {
  // variant ke hisaab se color classes
  const variantClasses =
    variant === "secondary"
      ? "bg-gray-200 text-gray-800 border-transparent"
      : variant === "destructive"
      ? "bg-red-100 text-red-700 border-red-200"
      : "bg-blue-100 text-blue-700 border-blue-200"; // default

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium",
        variantClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export { Badge };
