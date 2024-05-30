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
      <div className="bg-zinc-800 border-b border-zinc-700">
        <button onClick={createPost} className="btn btn-sm bg-[#0390FD] text-white border border-[#0390FD] text-xs m-5">
          Create Post
        </button>
      </div>
      <div className="flex flex-grow">
        <div className="bg-zinc-800 text-white p-3 min-w-56">
          <h3>Blog display</h3>
          <button>Change color</button>
          <div className="flex flex-col gap-6">
            <input
              type="text"
              value={titleValue}
              onChange={e => setTitleValue(e.target.value)}
              className="mt-4 p-2 border rounded-lg text-black"
              placeholder="Post Title"
            />
            <input
              type="text"
              value={tagValue}
              onChange={e => setTagValue(e.target.value)}
              className="mt-4 p-2 border rounded-lg text-black"
              placeholder="Add tags to the post, comma separated eg. news,economy,crisis"
            />
            <input
              placeholder="Add image"
              className="mt-4 p-2 border rounded-lg"
              onChange={e => setFileValue(e.target.files)}
              type="file"
            />
          </div>
        </div>
        <div className="w-full">
          <Editor
            className="mb-0 w-full"
            defaultValue={{
              type: "doc",
              content: [
                {
                  type: "paragraph",
                },
              ],
            }}
            onDebouncedUpdate={(editor: TipTapEditor | undefined) => setBodyValue(editor?.getHTML() || "")}
          />
        </div>
      </div>
    </div>
  );
}
