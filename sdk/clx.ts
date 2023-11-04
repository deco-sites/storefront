/** filter out nullable values, join and minify class names */
export const clx = (...args: (string | null | undefined | false)[]) =>
  args.filter(Boolean).join(" ").replace(/\s\s+/g, " ");
