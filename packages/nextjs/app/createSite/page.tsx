"use client";

import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { createNewPost, uploadFile } from "~~/services/web3/signMessage";

export default function CreateBlog() {
  const [bodyValue, setBodyValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [fileValue, setFileValue] = useState([]);

  const [outputValue, setOutputValue] = useState("");

  const createPost = async () => {
    // Replace this with your actual createPost logic

 
    const filecid = await uploadFile(fileValue);
 
    const postcid = await createNewPost({
      title: titleValue,
      body: bodyValue,
      image: filecid?.data.Hash as string,
      tags: tagValue.split(","),
    });
    setOutputValue("Post IPFS Address: " + postcid.data.Hash); // Store the result in the outputValue state
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10 bg-zinc-900">
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
            <input
              type="text"
              value={titleValue}
              onChange={e => setTitleValue(e.target.value)}
              className="mt-4 p-2 border rounded"
              placeholder="Post Title"
            />
            <input
              type="text"
              value={bodyValue}
              onChange={e => setBodyValue(e.target.value)}
              className="mt-4 p-2 border rounded"
              placeholder="Post Body"
            />
            <input placeholder="Post Image" onChange={e => setFileValue(e.target.files)} type="file" />

            <input
              type="text"
              value={tagValue}
              onChange={e => setTagValue(e.target.value)}
              className="mt-4 p-2 border rounded"
              placeholder="Post Tags comma separated eg. news,economy,crisis"
            />
            <div>
              <button onClick={createPost} className="link">
                Create Post
              </button>
              <div className="mt-4">{outputValue && <p>{outputValue}</p>}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}