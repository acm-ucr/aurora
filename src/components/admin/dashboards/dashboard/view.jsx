"use client";
import { useState } from "react";
// import { COLORS } from "@/data/Tags";
import { Download } from "lucide-react";
import { download } from "@/utils/download";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const View = ({ title, src }) => {
  const [modal, setModal] = useState({
    title: "",
    src: "",
    visible: false,
  });

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
            alt="Photo of the Judge"
            data-cy="modal-image"
          />
        </DialogContent>
      </Dialog>

      <Badge
        className="text-black hover:cursor-pointer"
        onClick={() => setModal({ src, title, visible: true })}
      >
        view
      </Badge>

      <Download
        className={`h-full hover:cursor-pointer hover:opacity-70`}
        onClick={() => download(src, `${title.replace(" ", "_")}.png`)}
      />
    </div>
  );
};

export default View;
