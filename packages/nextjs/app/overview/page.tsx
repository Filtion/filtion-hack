import React from "react";

const testData = [
  {
    title: "Test blog about everything",
    url: "skitpond/frogmind",
    date: new Date(),
  },
  {
    title: "How to write a blog?",
    url: "skitpond/howto",
    date: new Date(),
  },
  {
    title: "What is a DAO?",
    url: "skitpond/vamos",
    date: new Date(),
  },
  {
    title: "Where do we stand on market disruption",
    url: "disruption",
    date: new Date(),
  },
  {
    title: "What is Defi?",
    url: "skitpond/defimain",
    date: new Date(),
  },
  {
    title: "Test blog about everything",
    url: "skitpond/frogmind",
    date: new Date(),
  },
  {
    title: "How to write a blog?",
    url: "skitpond/howto",
    date: new Date(),
  },
  {
    title: "What is a DAO?",
    url: "skitpond/vamos",
    date: new Date(),
  },
  {
    title: "Where do we stand on market disruption",
    url: "disruption",
    date: new Date(),
  },
  {
    title: "What is Defi?",
    url: "skitpond/defimain",
    date: new Date(),
  },
];

export default function Overview() {
  return (
    <div className="flex flex-col flex-grow bg-zinc-900 text-white items-center">
      {/* <h2 className="text-xl font-bold">My posts</h2> */}
      <table border="1" className="w-full">
        <thead className="bg-zinc-800 border-b-2 border-zinc-700">
          <tr className="">
            <th className="w-1/5">My Posts</th>
            <th className="text-start py-4 font-normal w-1/5">Title</th>
            <th className="text-start font-normal w-1/5">URL</th>
            <th className="text-start font-normal w-1/5">Date</th>
            <th className="w-1/6"></th>
          </tr>
        </thead>
        <tbody className="max-w-[900px] w-2/3 text-zinc-300">
          {testData.map((data, index) => (
            <tr key={index}>
              <td></td>
              <td className={`${index === 0 ? "pt-8 pb-3" : "py-3"}`}>{data.title}</td>
              <td className={`${index === 0 ? "pt-8 pb-3" : "py-3"}`}>
                <a href={`/${data.url}`}>{data.url}</a>
              </td>
              <td className={`${index === 0 ? "pt-8 pb-3" : "py-3"}`}>{data.date.toLocaleDateString()}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
