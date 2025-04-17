import View from "@/components/admin/dashboards/dashboard/view";
import { generateSelect, generateStatus } from "./columns";
import { STATUSES } from "@/data/statuses";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import JSZip from "jszip";
import { save } from "@/utils/download";
import { Download } from "lucide-react";
import data from "../config";
import { Tags } from "@/types/dashboard";
import { Resume } from "@/types/users";

export const TAGS: Tags[] = [
  {
    text: "confirm",
    value: 1,
  },
  {
    text: "not attending",
    value: -1,
  },
];

export const COLUMNS: (ColumnDef<Resume, string> & {
  searchable?: boolean;
})[] = [
  generateSelect(),
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    accessorKey: "name",
    id: "fullName",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: ({ row }) => (
      <div
        onClick={row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {row.getValue("fullName")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Resume, Resume["email"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
      </div>
    ),
  },
  {
    accessorKey: "school",
    header: "School",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Resume, Resume["school"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  {
    accessorKey: "grade",
    header: "Grade",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Resume, Resume["grade"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
  generateStatus(STATUSES),
  {
    accessorKey: "resume",
    header: ({ table }) => {
      const downloadZip = () => {
        const { rows } = table.getRowModel();
        const resumes = rows.map(
          ({ original: { firstName, lastName, resume } }) => ({
            resume,
            name: `${firstName} ${lastName}`,
          }),
        );
        const zip = new JSZip();
        const folder = zip.folder("resumes");

        if (folder) {
          resumes.forEach(({ resume, name }) => {
            const src = resume.split(",")[1];
            folder.file(`${name.replace(" ", "_")}.pdf`, src, {
              base64: true,
            });
          });
        }

        zip.generateAsync({ type: "blob" }).then((blob) => {
          const url = URL.createObjectURL(blob);
          save(
            `${data.name.replace(" ", "_")}_${data.date.getFullYear()}resumes.zip`,
            url,
          );
          URL.revokeObjectURL(url);
        });
      };

      return (
        <div className="flex">
          Resume
          <Download
            onClick={downloadZip}
            className="text-hackathon-gray-200 hover:cursor-pointer hover:opacity-50"
          />
        </div>
      );
    },
    enableSorting: false,
    cell: (props: CellContext<Resume, Resume["resume"]>) => (
      <View
        src={props.getValue()}
        title={props.row.getValue("name")}
        type="resume"
      />
    ),
  },
];
