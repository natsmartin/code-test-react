import React, { useState } from "react";
import Link from "../Link/Link";

const Mission = ({ details }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible((prev) => !prev);
  };

  const currentHour = new Date().getHours();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const getLaunchPosted = (year, date) => {
    const labelLaunchPosted =
      new Date().getFullYear() - year === 0 &&
      currentMonth - new Date(date).getMonth() === 0
        ? `${
            currentHour - new Date(date).getHours() < 0
              ? currentHour - new Date(date).getHours() + 24
              : currentHour - new Date(date).getHours()
          } hours ago`
        : new Date().getFullYear() - year === 0 && currentMonth - new Date(date).getMonth() !== 0
        ? `${
            currentMonth - new Date(date).getMonth() < 0
              ? currentMonth - new Date(date).getMonth() + 12
              : currentMonth - new Date(date).getMonth()
          } months ago`
        : 
        `${currentYear - year} years ago`;
    return labelLaunchPosted;
  };

  return (
    <div className="md:w-[50vw] border-slate-800 w-[80vw] h-auto rounded-[4px] py-5 px-5 m-5 shadow-md shadow-slate-500">
      <div className="md:[&_span]:text-sm [&_span]:text-xs">
        <h1 className="font-extrabold text-2xl">
          {details.mission_name}
          <span
            className={`align-top text-white bg-green-500 text-sm mx-4 p-1 ${
              details.launch_success || "hidden"
            }`}
          >
            success
          </span>
          <span
            className={`align-top text-white bg-sky-500 text-sm mx-4 p-1 ${
              details.upcoming || "hidden"
            }`}
          >
            upcoming
          </span>
          {!details.launch_success && !details.upcoming && (
            <span
              className={`align-top text-white bg-red-500 text-sm mx-4 p-1`}
            >
              failed
            </span>
          )}
        </h1>
      </div>

      <div className="flex *:text-xs my-2 *:mr-1 md:justify-normal md:*:text-sm">
        <p className="text-slate-500">
          {getLaunchPosted(details.launch_year, details.launch_date_utc)}
        </p>
        <span>{ (details.links.article_link || details.links.video_link) && '|'}</span>
        {details.links.article_link && 
          <Link label="Article" link={details.links.article_link} />
        }
        <span>{details.links.article_link && details.links.video_link && '|'}</span>
        {details.links.video_link && 
          <Link label="Video" link={details.links.video_link} />
        }
      </div>
      <div className={`flex *:m-4 flex-col justify-center items-center *:text-xs [&>p]:mb-6
        md:flex-row md:justify-normal md:*:text-sm
        ${visible ? "" : "hidden"}`}>
        <img
          src={details.links.mission_patch_small}
          alt={details.mission_name}
          width="100px"
          height="100px"
        />
        <p>{details.details}</p>
      </div>
      <button
        onClick={handleClick}
        className="bg-blue-500 py-3 px-5 rounded-md text-white text-sm"
      >
        {visible ? "HIDE" : "VIEW"}
      </button>
    </div>
  );
};

export default Mission;
