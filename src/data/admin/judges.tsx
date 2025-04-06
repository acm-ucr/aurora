import View from "@/components/admin/dashboards/dashboard/view";
import { AFFILIATIONS } from "../form/information";
import { generateAffiliation, generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import JSZip from "jszip";
import { save } from "@/utils/download";
import { Download } from "lucide-react";
import data from "../config";
import { Column, Tags } from "@/types/dashboard";
import { ColumnDef } from "@tanstack/react-table";

type Judge = {
  name: string;
  email: string;
  phone: string;
  gender: string;
  title: string;
  affiliation: string;
  shirt: string;
  photo: string;
};

export const TAGS: Tags[] = [
  {
    text: "accept",
    value: 1,
  },
  {
    text: "reject",
    value: -1,
  },
];

export const COLUMNS: (ColumnDef<Judge> & Column)[] = [
  generateSelect(),
  {
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "shirt",
    header: "Shirt",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("shirt")}
      </div>
    ),
  },

  {
    accessorKey: "title",
    header: "Title",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("title")}
      </div>
    ),
  },
  generateAffiliation(AFFILIATIONS),
  generateStatus(STATUSES),
  {
    accessorKey: "photo",
    searchable: false,
    header: ({ table }) => {
      const downloadZip = () => {
        const { rows } = table.getRowModel();
        const photos = rows.map(({ original: { name, photo } }) => ({
          photo,
          name,
        }));

        const zip = new JSZip();
        const folder = zip.folder("photos");

        if (folder) {
          photos.forEach(({ photo, name }) => {
            const src = photo.split(",")[1];
            folder.file(`${name.replace(" ", "_")}.png`, src, { base64: true });
          });
        }

        zip.generateAsync({ type: "blob" }).then((blob) => {
          const url = URL.createObjectURL(blob);
          save(
            `${data.name.replace(" ", "_")}_${data.date.getFullYear()}_judges_images.zip`,
            url,
          );
          URL.revokeObjectURL(url);
        });
      };

      return (
        <div className="flex">
          Photo <Download onClick={downloadZip} />
        </div>
      );
    },
    enableSorting: false,
    cell: ({ row }) => (
      <View src={row.getValue("photo")} title={row.getValue("name")} />
    ),
  },
];
