"use client";

import React from "react";
import Link from "next/link";
import placeholder from "../components/assets/placeholder.jpg";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import LoginPage from "~~/components/LoginPage";

const testData = [
  {
    id: 1,
    title: "Get your dream destination with our travel guide",
    category: "Travel",
    tags: ["travel"],
    image: placeholder,
    date: new Date(),
  },
] as const;

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  if (!connectedAddress) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col px-14 pt-14 gap-6 flex-grow bg-zinc-900">
      <div className="flex items-center gap-6 w-2/3 max-w-[900px]">
        <h1 className="capitalize text-white font-bold text-4xl">My posts</h1>
        <Link href="/create" className="btn btn-sm bg-[#0390FD] text-white border border-[#0390FD] text-xs">
          Create a new post
        </Link>
        <Link href="/note" className="btn btn-sm bg-[#0390FD] text-white border border-[#0390FD] text-xs">
          Create a new note
        </Link>
      </div>
      {testData.map(blog => {
        return (
          <div
            key={blog.id}
            className="relative w-2/3 max-w-[900px] h-[350px] bg-[url('../components/assets/placeholder.jpg')] bg-cover bg-no-repeat bg-center rounded-lg"
          >
            <div className="inline-block absolute top-5 right-5 max-w-[40%]">
              <p className="bg-white rounded-md m-0 py-1 px-2">{blog.category}</p>
              <p className="bg-white rounded-md m-0 py-1 px-2 text-xl flex flex-wrap font-bold">{blog.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
