import { forwardRef } from "react";
import { Link } from "react-router-dom";

export const MarkLink = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <>
      <Link
        className={`text-transparent bg-gradient-to-br from-sky-800 to-sky-400 bg-clip-text ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </Link>
    </>
  );
});
