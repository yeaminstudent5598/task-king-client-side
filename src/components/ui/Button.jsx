import { forwardRef } from "react";

const DefaultClass = "flex items-center gap-3";

export const Button = forwardRef(
  ({ option, className, children, ...props }, ref) => {
    return (
      <button
        className={`bg-gradient-to-br from-sky-600 text-sky-100 font-medium to-sky-400 rounded-md border dark:border-sky-800 border-sky-600 px-5 py-1 text-sm hover:opacity-80 transition-all ${
          className || ""
        } ${DefaultClass}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
