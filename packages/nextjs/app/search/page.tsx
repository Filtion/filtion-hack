"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import LoginPage from "~~/components/LoginPage";

const existingPostData = [{ title: "Skipond" }, { title: "Dolores" }, { title: "Lagoblanco" }];

export default function SearchName() {
  const [search, setSearch] = useState<string>("");
  const { address } = useAccount();

  if (!address) {
    return <LoginPage />;
  }

  return (
    <div className="flex flex-col flex-grow bg-search bg-cover bg-no-repeat">
      <div className="relative flex items-center flex-col flex-grow bg-black bg-opacity-50 pt-32">
        <div className="flex flex-col gap-6">
          <h2 className="text-white text-3xl font-bold">Find your unique blog post username</h2>
          <div className="flex items-center">
            <input
              type="search"
              placeholder="Search for a name"
              className="py-4 px-5 rounded-lg bg-zinc-800 border border-zinc-600 text-zinc-500 text-sm z-0 w-full"
              onChange={e => setSearch(e.target.value)}
            />
            {!search && <MagnifyingGlassIcon className="w-4 h-4 z-10 fill-zinc-500 -ml-10" />}
            <Link href="/blog" className="btn btn-sm bg-[#0390FD] text-white border ml-10 border-[#0390FD] text-xs">
              Create a blog
            </Link>
          </div>
        </div>
        <div className="bg-slate-800 py-6 px-8 rounded-lg absolute bottom-14 right-14">
          <p className="text-white text-xs mt-0">You already have these names on your account:</p>
          {existingPostData.map((post, i) => {
            return (
              <p className="text-white my-1 text-xs" key={i}>
                {post.title}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
