import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromPastes } from "../Redux/PasteSlice";

// Icons
import { PencilLine, Trash2, Download, Copy, Calendar } from "lucide-react";

// =============== Utility: Format date nicely ===============
function FormatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const Paste = () => {
  // Redux state
  const pastes = useSelector((state) => state.Paste.pastes);
  const dispatch = useDispatch();

  // Local search state
  const [searchTerm, setSearchTerm] = useState("");

  // Filter notes based on search
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // =============== Handlers ===============
  // Delete a paste
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  // Download a paste as .txt file
  function handleDownload(paste) {
    const element = document.createElement("a");
    const file = new Blob([paste.content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${paste.title || "untitled"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Downloaded!");
  }

  // =============== JSX ===============
  return (
    <div>
      {/* ================= Search Bar ================= */}
      <input
        className="p-3 rounded-2xl min-w-full pl-5 mt-6"
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ================= Notes Section ================= */}
      <div className="flex flex-col border border-white py-4 rounded-[0.4rem] mt-8">
        {/* Notes heading */}
        <h2 className="text-center text-5xl border-b border-[rgba(128,121,121,0.3)] pb-4">
          Notes
        </h2>

        {/* Notes list */}
        <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
          {filteredData.length > 0 &&
            filteredData.map((paste) => (
              <div
                key={paste?._id}
                className="border border-gray-500 p-3 rounded-lg w-full flex flex-col space-y-3 text-left"
              >
                {/* ---------- Note Title (click to view full note) ---------- */}
                <Link
                  to={`/pastes/${paste._id}`}
                  className="text-white text-3xl font-semibold hover:underline hover:text-blue-500"
                >
                  {paste.title}
                </Link>

                {/* ---------- Note Content Preview ---------- */}
                <div className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                  {paste.content}
                </div>

                {/* ---------- Actions + Date ---------- */}
                <div className="flex flex-col gap-y-3 sm:items-end">
                  
                  {/* Buttons row */}
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    {/*  Edit Button */}
                    <button className="p-2 rounded-[0.2rem] bg-gray hover:bg-transparent group hover:border-blue-500">
                      <a href={`/?pasteId=${paste?._id}`}>
                        <PencilLine
                          className="text-white group-hover:text-blue-500"
                          size={20}
                        />
                      </a>
                    </button>

                    {/*  Copy Button */}
                    <button
                      className="p-2 rounded-[0.2rem] bg-gray hover:bg-transparent group hover:border-yellow-500"
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to Clipboard");
                      }}
                    >
                      <Copy
                        className="text-white group-hover:text-yellow-500"
                        size={20}
                      />
                    </button>

                    {/*  Download Button */}
                    <button
                      onClick={() => handleDownload(paste)}
                      className="p-2 rounded-[0.2rem] bg-gray hover:bg-transparent group hover:border-green-500"
                    >
                      <Download
                        className="text-white group-hover:text-green-500"
                        size={20}
                      />
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="p-2 rounded-[0.2rem] bg-gray hover:bg-transparent group hover:border-red-500"
                    >
                      <Trash2
                        className="text-white group-hover:text-red-500"
                        size={20}
                      />
                    </button>
                  </div>

                  {/* Created date */}
                  <div className="gap-x-2 flex items-center">
                    <Calendar className="text-gray-500" size={18} />
                    <span className="text-sm text-gray-500">
                      {FormatDate(paste?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Paste;
