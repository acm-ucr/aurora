"use client";
import { TAGS, COLUMNS } from "@/data/admin/sponsors";
import { STATUSES } from "@/data/statuses";
import Table from "./dashboard/dashboard";
import { SearchParams } from "@/types/dashboard";

type props = {
  searchParams: SearchParams;
};

const Sponsors = ({ searchParams }: props) => {
  return (
    <div className="font-poppins flex h-full flex-col gap-3 py-4">
      <Table
        searchParams={searchParams}
        title="Sponsors"
        columns={COLUMNS}
        subcolumns={[]}
        tags={TAGS}
        statuses={STATUSES}
      />
    </div>
  );
};
export default Sponsors;
