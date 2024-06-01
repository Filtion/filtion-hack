"use client";

import React, { useEffect, useState } from "react";
import { listPosts } from "~~/services/web3/signMessage";

export default function Overview() {
  const [posts, setPotes] = useState<any[]>([]);

  const listNote = async () => {
    const p = await listPosts();
    console.log(p);
    setPotes(p);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  useEffect(() => {
    listNote();
  }, []);
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
          {posts.map((data, index) => (
            <tr key={index}>
              <td></td>
              <td className={`${index === 0 ? "pt-8 pb-3" : "py-3"}`}>{data.fileName}</td>
              <td className={`${index === 0 ? "pt-8 pb-3" : "py-3"}`}>
                <a href={`https://gateway.lighthouse.storage/ipfs/` + data.cid}>{data.cid}</a>
              </td>
              <td className={`${index === 0 ? "pt-8 pb-3" : "py-3"}`}>{formatDate(data.createdAt)}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
