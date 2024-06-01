"use client";

import React, { useEffect, useState } from "react";
import type { Editor as TipTapEditor } from "@tiptap/core";
import { Editor } from "novel";
import { createNewNote, decrypt, listNotes } from "~~/services/web3/signMessage";

export default function Blog() {
  const [bodyValue, setBodyValue] = useState<string>("");
  const [notes, setNotes] = useState<any[]>([]);

  const handleSelectNote = async (note: any) => {
    console.log("Selected note:", note);

    const data = await decrypt(note.cid);
    console.log(data);
    alert(data);
  };
  const createNote = async () => {
    await createNewNote(bodyValue);
  };

  const listNote = async () => {
    const notes = await listNotes();
    console.log(notes);
    setNotes(notes);
  };

  useEffect(() => {
    listNote();
  }, []);

  return (
    <div className="flex flex-grow flex-col">
      <div className="bg-zinc-800 border-b border-zinc-700">
        <button onClick={createNote} className="btn btn-sm bg-[#0390FD] text-white border border-[#0390FD] text-xs m-5">
          Create Note
        </button>
      </div>
      <div className="flex flex-grow">
        <div className="bg-zinc-800 text-white p-3 min-w-56">
          <h3>Note display</h3>
          <button>Change color</button>
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
      <div className="bg-zinc-800 border-b border-zinc-700">
        Notes
        <div className="p-3">
          {notes.length > 0 ? (
            notes.map(note => (
              <div key={note.id} className="bg-zinc-700 p-3 mb-3 rounded">
                <h4 className="text-white">{note.cid}</h4>
                <p className="text-gray-300">{note.fileName}</p>
                <p className="text-gray-300">{note.lastUpdate}</p>

                <button
                  onClick={() => handleSelectNote(note)}
                  className="btn btn-sm bg-[#0390FD] text-white border border-[#0390FD] text-xs m-5"
                >
                  View Note
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-300">No encrypted notes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
