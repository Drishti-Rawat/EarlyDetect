import React from "react";

export const Step = ({ number, text }: { number: number; text: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold mb-2">
        {number}
      </div>
      <p className="text-lg">{text}</p>
    </div>
  );