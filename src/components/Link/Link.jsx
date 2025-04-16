import React from "react";

const Link = ({ label, link }) => {
  return (
    <a target="_blank" rel="noreferrer"
    className="text-blue-700 font-medium underline mx-[2px] hover:cursor-pointer" href={link}>
      {label}
    </a>
  );
};

export default Link;
