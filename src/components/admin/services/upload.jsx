import { useState } from "react";
import { Paperclip, X } from "lucide-react";
import toaster from "@/utils/toaster";
import { BYTES } from "@/data/Bytes";
import { compress } from "@/utils/convert";

const getSize = (maxSize) => BYTES[maxSize[1]] * maxSize[0];
const getType = (types) => "." + types.join(",.");

const displayFile = (file) =>
  `${file.name} (${Math.round(file.size / 10.24) / 100}KB)`;

const Upload = ({ text, setObjects, objects, size, types }) => {
  const [uploading, setUploading] = useState(false);

  const handleInput = (e) => {
    setUploading(true);
    if (objects.files.length + e.target.files.length > 5) {
      toaster("Exceeds 5 files!", "error");
      setUploading(false);
      return;
    }

    setObjects({
      ...objects,
      files: [
        ...objects.files,
        ...Object.values(e.target.files).filter(async (file) => {
          const blob = await compress(file);
          if (blob.size > getSize(size)) {
            toaster(`${blob.name} exceeds ${size[0]} ${size[1]}`, "error");
            return false;
          }
          if (objects.files.map((file) => file.name).includes(file.name)) {
            toaster(`${file.name} is already uploaded`, "error");
            return false;
          }
          return true;
        }),
      ],
    });
    setUploading(false);
  };

  return (
    <div className="mt-3">
      <p className="mb-0">{text}</p>
      <div className="flex flex-col items-start">
        {uploading && <p>uploading...</p>}
        <div className="flex flex-wrap">
          {objects?.files.map((file, index) => (
            <div
              key={index}
              className="mb-1 mr-1 flex !max-w-fit items-center bg-hackathon-gray-100 p-0 px-2 py-1"
            >
              <p className="m-0 whitespace-nowrap text-sm font-semibold text-gray-500">
                {displayFile(file)}
              </p>
              <X
                className="ml-2 text-sm text-hackathon-gray-300 hover:cursor-pointer hover:text-red-600"
                onClick={() => {
                  setObjects({
                    ...objects,
                    files: objects.files.filter((file, idx) => index !== idx),
                  });
                }}
              />
            </div>
          ))}
        </div>
        <label
          htmlFor="dropzone-file"
          className="w-git m-0 flex cursor-pointer items-center justify-center rounded border-2 border-gray-300 bg-gray-50 px-2 py-1 hover:bg-gray-100"
        >
          <Paperclip className="mr-1 text-xl text-gray-500" />
          <p className="m-0 text-sm font-semibold text-gray-500">attach</p>
          <input
            id="dropzone-file"
            onChange={handleInput}
            type="file"
            className="hidden"
            multiple
            title="attatchment"
            accept={() => getType(types)}
          />
        </label>
      </div>
    </div>
  );
};

export default Upload;
