// simple cn (classNames) helper
export function cn(...args) {
  return args
    .flat()
    .filter(Boolean)
    .join(" ");
}
