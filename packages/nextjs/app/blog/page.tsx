"use client";

import React, { useState } from "react";
import type { Editor as TipTapEditor } from "@tiptap/core";
import { Editor } from "novel";
import { createNewPost, uploadFile } from "~~/services/web3/signMessage";

const colors = ["bg-white", "bg-black", "bg-pink-500", "bg-blue-700", "bg-yellow-300"];

export default function Blog() {
  const [bodyValue, setBodyValue] = useState<string>("");
  const [titleValue, setTitleValue] = useState("");
  const [tagValue, setTagValue] = useState("");
  const [fileValue, setFileValue] = useState<FileList | null>(null);

  const createPost = async () => {
    const post: any = {
      title: titleValue,
      body: bodyValue,
      tags: tagValue.split(","),
    };
    let filecid;
    if (fileValue) {
      filecid = await uploadFile(fileValue);
      filecid = filecid?.data.Hash as string;
      post.image = filecid;
    }

    //const postcid =
    await createNewPost(post);
    //setOutputValue("Post IPFS Address: " + postcid.data.Hash); // Store the result in the outputValue state
  };

  return (
    <div className="flex flex-grow flex-col text-blue">
      <div className="bg-zinc-800 border-b border-zinc-700 px-4 flex justify-end">
        <button onClick={createPost} className="btn btn-sm bg-[#0390FD] text-white border border-[#0390FD] my-3">
          Publish
        </button>
      </div>
      <div className="flex flex-grow">
        <div className="bg-zinc-800 text-white p-3 ">
          <h3 className="text-xl font-bold underline underline-offset-8 mb-8">Blog display</h3>

          <div>
            <h4>Background color</h4>
            <div className="flex gap-1 py-4">
              {colors.map((color, i) => (
                <div key={i} className={`${color} w-4 h-4 rounded-full`} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <input
              type="text"
              value={titleValue}
              onChange={e => setTitleValue(e.target.value)}
              className="mt-4 p-2 border rounded-lg text-black bg-white"
              placeholder="Post Title"
            />
            <input
              type="text"
              value={tagValue}
              onChange={e => setTagValue(e.target.value)}
              className="mt-4 p-2 border rounded-lg text-black bg-white"
              placeholder="Add tags to the post, comma separated eg. news,economy,crisis"
            />
            <div>
              <h4 className="mt-3">Cover image</h4>
              <input
                placeholder="Add image"
                className="mt-4 p-2 border rounded-lg"
                onChange={e => setFileValue(e.target.files)}
                type="file"
              />
            </div>
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
