import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.Paste.pastes);

  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <div className="text-center text-red-500 mt-10">Paste not found</div>;
  }

  return (
    <div className="p-5 max-w-4xl mx-auto">
      
      {/* Title */}
      <h1 className="text-center text-3xl mb-5">{paste.title}</h1>

      {/* Content */}
      <div className="border p-3 rounded-lg bg-gray text-gray-200 whitespace-pre-wrap">
        {paste.content}
      </div>
    </div>
  );
};

export default ViewPaste;
