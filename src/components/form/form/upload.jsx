import { useState } from "react";
import {
  Upload as LucideUpload,
  FileText,
  Image as LucideImage,
  X,
  Eye,
} from "lucide-react";
import toaster from "@/utils/toaster";
import { BYTES } from "@/data/bytes";
import { readFileAsBase64, compress } from "@/utils/convert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const getSize = (maxSize) => BYTES[maxSize[1]] * maxSize[0];
const getType = (types) => "." + types.join(",.");

const Upload = ({ field, user, setUser, text, maxSize, types, required }) => {
  const [file, setFile] = useState(
    user[field] && user[field].startsWith("data:image")
      ? { src: user[field], type: "image", title: `${user.firstName}.png` }
      : null,
  );
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleInput = async (e) => {
    setUploading(true);
    const blob = await compress(e.target.files[0]);
    if (blob.size > getSize(maxSize)) {
      toaster(`File too big, exceeds ${maxSize[0]} ${maxSize[1]}!`, "error");
      return;
    }
    const base64 = await readFileAsBase64(blob);
    setUser({ ...user, [field]: base64 });
    setFile({
      src: base64,
      type: blob.type,
      title: blob.name,
    });
    setUploading(false);
  };

  return (
    <div className="flex flex-col">
      <p className="mb-1 font-semibold">
        {text}
        {required && <span className="text-red-500">*</span>}
      </p>
      <div className="flex w-full flex-col items-center">
        {!file && (
          <label
            htmlFor="dropzone-file"
            className="flex h-fit w-full cursor-pointer flex-col items-center justify-center rounded border border-slate-200 bg-white hover:bg-slate-100"
          >
            <div className="flex flex-col items-center justify-center py-4">
              <LucideUpload className="mb-2 text-3xl text-hackathon-gray-200" />
              <p className="text-sm font-semibold text-hackathon-gray-200">
                Upload from my computer
              </p>
            </div>
            <div className="w-full">
              <input
                id="dropzone-file"
                onChange={handleInput}
                type="file"
                className="hidden"
                accept={getType(types)}
              />
            </div>
          </label>
        )}
        {file && (
          <div className="my-2 flex w-full items-center justify-between bg-gray-200 px-2 py-2">
            <div className="flex items-center">
              {file.type.split("/")[0] === "image" ? (
                <LucideImage className="mr-2 text-xl" />
              ) : (
                <FileText className="mr-2 text-xl" />
              )}
              {file.title}
            </div>
            <div className="flex flex-row">
              {file.type.split("/")[0] === "image" && (
                <Eye
                  onClick={() => setShowModal(true)}
                  className="mr-2 text-gray-500 hover:cursor-pointer hover:text-gray-800"
                />
              )}

              <X
                className="text-gray-500 hover:cursor-pointer hover:text-red-600"
                onClick={() => setFile(null)}
              />
            </div>
          </div>
        )}

        {showModal && (
          <Dialog
            open={showModal}
            onOpenChange={(value) => setShowModal(value)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{user.firstName}&apos;s Picture</DialogTitle>
              </DialogHeader>
              <embed
                fill={true}
                className="h-full w-full object-cover"
                src={file.src}
                alt="Photo of the Judge"
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
      {toaster.type === "error"
        ? uploading && "UPLOADING ..."
        : uploading && "UPLOAD FAILED"}
    </div>
  );
};

export default Upload;
