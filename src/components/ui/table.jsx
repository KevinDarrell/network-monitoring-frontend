import React from "react";
import clsx from "clsx";

export function Table({ children, className }) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
      <table
        className={clsx(
          "min-w-full divide-y divide-gray-200 bg-white text-sm text-gray-800",
          className
        )}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
      {children}
    </thead>
  );
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      {children}
    </tr>
  );
}

export function TableCell({ children, align = "left", className }) {
  return (
    <td
      className={clsx(
        "px-4 py-3 text-sm",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </td>
  );
}

export function TableHeadCell({ children, align = "left", className }) {
  return (
    <th
      scope="col"
      className={clsx(
        "px-4 py-3 font-semibold text-gray-700",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {children}
    </th>
  );
}
