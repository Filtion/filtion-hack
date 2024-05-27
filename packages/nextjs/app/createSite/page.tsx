"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { createNewPost } from "~~/services/web3/signMessage";

export default function CreateBlog() {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");

  const createPost = async () => {
    // Replace this with your actual createPost logic
    const postcid = await createNewPost(inputValue, "Post title");
    setOutputValue("Post IPFS Address: " + postcid.data.Hash); // Store the result in the outputValue state

    console.log("Input value:", inputValue);
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10 bg-zinc-900">
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="mt-4 p-2 border rounded"
              placeholder="Post Body"
            />
            <div>
              <button onClick={createPost} className="link">
                Create Post{" "}
              </button>{" "}
              <div className="mt-4">{outputValue && <p>{outputValue}</p>}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
