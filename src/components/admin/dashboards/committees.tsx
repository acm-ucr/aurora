"use client";
import { TAGS, COLUMNS } from "@/data/admin/committees";
import { STATUSES } from "@/data/statuses";
import Table from "./dashboard/dashboard";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Committee = ({ searchParams }: props) => {
  return (
    <div className="flex h-full flex-col gap-3 py-4 font-poppins">
      <Table
        searchParams={searchParams}
        title="Committees"
        columns={COLUMNS}
        subcolumns={[]}
        tags={TAGS}
        statuses={STATUSES}
      />
    </div>
  );
};
export default Committee;
