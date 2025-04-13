"use client";
import { useState } from "react";
import { Download } from "lucide-react";
import { download } from "@/utils/download";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const View = ({ title, src, type }) => {
  const [modal, setModal] = useState({
    title: "",
    src: "",
    visible: false,
  });

  const openPDF = () => {
    const byteCharacters = atob(src.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, "_blank");
  };

  return (
    <div className="flex w-full items-center justify-between">
      <Dialog
        open={modal.visible}
        onOpenChange={(value) => setModal({ src, title, visible: value })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{modal.title}</DialogTitle>
          </DialogHeader>
          <embed
            fill={true}
            className="h-full w-full object-cover"
            src={modal.src}
            alt={
              type === "photo" ? "Photo of the Judge" : "Resume of Participant"
            }
          />
        </DialogContent>
      </Dialog>

      <Badge
        className="text-black hover:cursor-pointer"
        onClick={() =>
          type === "photo" ? setModal({ src, title, visible: true }) : openPDF()
        }
      >
        view
      </Badge>

      <Download
        className={`h-full hover:cursor-pointer hover:opacity-70`}
        onClick={() =>
          download(
            src,
            `${title.replace(" ", "_")}.${type === "photo" ? "png" : "pdf"}`,
          )
        }
      />
    </div>
  );
};

export default View;
