import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "./utils";

/**
 * Simple variant handling (replacement for cva/class-variance-authority).
 * Accepts variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
 * size: "default" | "sm" | "lg" | "icon"
 */
const variantClasses = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60",
  outline: "border bg-background text-foreground hover:bg-accent",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline",
};

const sizeClasses = {
  default: "h-9 px-4 py-2 has-[>svg]:px-3",
  sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
  lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
  icon: "size-9 rounded-md",
};

export function Button(props) {
  const {
    className,
    variant = "default",
    size = "default",
    asChild = false,
    children,
    ...rest
  } = props;

  const Comp = asChild ? Slot : "button";
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2",
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    className
  );

  return (
    <Comp data-slot="button" className={classes} {...rest}>
      {children}
    </Comp>
  );
}
