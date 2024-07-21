import React from "react";

export default function card({ value, text }) {
  return (
    <div className="text-center">
      <div className="text-3xl">{value}</div>
      <div>{text}</div>
    </div>
  );
}
