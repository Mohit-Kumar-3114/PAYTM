import React from "react";

export function Card2({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-full max-w-2xl h-auto border p-6 bg-white rounded-xl bg-[#ededed]">
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
