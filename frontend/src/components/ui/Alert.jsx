// src/components/ui/Alert.jsx
import React from "react";

// simple cn helper
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Alert({ className = "", variant = "default", children, ...props }) {
  // use variant to control colors so lint won't complain
  const variantClasses =
    variant === "destructive"
      ? "bg-red-50 border-red-300 text-red-700"
      : "bg-white border-gray-200 text-gray-800";

  return (
    <div
      role="alert"
      className={cn(
        "relative w-full rounded-lg px-4 py-3 text-sm grid grid-cols-[0_1fr] items-start gap-y-0.5",
        variantClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertTitle({ className = "", children, ...props }) {
  return (
    <div
      className={cn("col-start-2 font-medium tracking-tight", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertDescription({ className = "", children, ...props }) {
  return (
    <div
      className={cn("text-sm col-start-2 leading-relaxed", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Alert, AlertTitle, AlertDescription };
