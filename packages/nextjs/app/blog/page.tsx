"use client";

import React, { useState } from "react";
import type { Editor as TipTapEditor } from "@tiptap/core";
import { Editor } from "novel";
import { createNewPost, uploadFile } from "~~/services/web3/signMessage";

export default function Blog() {
  const [bodyValue, setBodyValue] = useState<string>("");
  const [titleValue, setTitleValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [fileValue, setFileValue] = useState<FileList | null>(null);

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
    <div className="flex flex-grow flex-col">
      <div className="bg-zinc-800 h-10 border-b border-zinc-700">Header</div>
      <div className="flex flex-grow">
        <div className="bg-zinc-800 text-white p-3 w-56">
          SIDEBAR
          <h3>blog display</h3>
          <button>Change color</button>
        </div>
        <div className="w-full">
          <Editor
            defaultValue={{ type: "doc", content: [] }}
            onDebouncedUpdate={(editor: TipTapEditor | undefined) => setBodyValue(editor?.getHTML() || "")}
          />
          {/* <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
            <input
              type="text"
              value={titleValue}
              onChange={e => setTitleValue(e.target.value)}
              className="mt-4 p-2 border rounded"
              placeholder="Post Title"
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
