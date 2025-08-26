import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../Redux/PasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.Paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content); 
      }
    }
  }, [pasteId, allPastes]); 

  function createpaste() {
  if (!title.trim() || !value.trim()) {
    alert("Title and Content Can't be Empty");
    return;
  }

  const paste = {
    title,
    content: value,
    _id: pasteId || Date.now().toString(36),
    createdAt: pasteId 
      ? allPastes.find((p) => p._id === pasteId)?.createdAt  // keep original
      : new Date().toISOString(),
    updatedAt: pasteId ? new Date().toISOString() : null,
  };

  if (pasteId) {
    dispatch(updateToPastes(paste)); // update
  } else {
    dispatch(addToPastes(paste)); // create
  }

  // reset
  setTitle("");
  setValue("");
  setSearchParams({});
}


  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="rounded-2xl w-full pl-5 mt-6"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createpaste} className="rounded-2xl mt-7">
          {pasteId ? "Update" : "Create"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="rounded-2xl w-full p-4 pl-5"
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
