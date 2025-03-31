import View from "@/components/admin/dashboards/dashboard/view";
import { generateSelect } from "./columns";
import { ColumnDef, CellContext } from "@tanstack/react-table";
import JSZip from "jszip";
import { save } from "@/utils/download";
import { Download } from "lucide-react";
import data from "../config";
import { Tags } from "@/types/dashboard";

type Resume = {
  name: string;
  email: string;
  school: string;
  grade: string;
  resume: string;
};

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
    accessorKey: "name",
    header: "Name",
    enableColumnFilter: true,
    filterFn: "includesString",
    searchable: true,
    cell: (props: CellContext<Resume, Resume["name"]>) => (
      <div
        onClick={props.row.getToggleSelectedHandler()}
        className="hover:cursor-pointer"
      >
        {props.getValue()}
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
    accessorKey: "resume",
    header: ({ table }) => {
      const downloadZip = () => {
        const { rows } = table.getRowModel();
        const resumes = rows.map(({ original: { name, resume } }) => ({
          resume,
          name,
        }));

        const zip = new JSZip();
        const folder = zip.folder("photos");

        if (folder) {
          resumes.forEach(({ resume, name }) => {
            //   const src = photo.split(",")[1];
            folder.file(`${name.replace(" ", "_")}.pdf`, resume, {
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
          <div className="text-hackathon-gray-200 hover:cursor-pointer hover:opacity-50">
            <Download onClick={downloadZip} />
          </div>
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

export const SUBCOLUMNS = [
  generateSelect(),
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
  {
    accessorKey: "resume",
    header: "Resume",
    enableColumnFilter: false,
    filterFn: "includesString",
    searchable: false,
    cell: (props: CellContext<Resume, Resume["resume"]>) => (
      <div>{props.getValue()}</div>
    ),
  },
];
