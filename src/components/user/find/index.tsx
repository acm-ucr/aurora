"use client";

import { Label } from "@/components/ui/label";
import Toolbar from "../toolbar";
import Idea from "./idea";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useState } from "react";
import { api } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
interface idea {
  title: string;
  languages: string[];
  details: string;
  contact: string;
}

const Find = () => {
  const ref = useRef(null);
  const [search, setSearch] = useState<idea[]>([]);

  const getIdeas = async () => {
    const { items }: { items: idea[] } = await api({
      url: "/api/dashboard/ideas",
      method: "GET",
    });

    setSearch(items);

    return items;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["findTeams"],
    queryFn: getIdeas,
  });

  const { measureElement, getVirtualItems } = useVirtualizer({
    count: search.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 100,
    measureElement: (el) => {
      if (el.clientHeight > 100) return el.clientHeight;
      return 100;
    },
    lanes: 4,
    overscan: 4,
  });

  if (isLoading) return <Loading />;
  return (
    <div className="flex h-full w-full flex-col">
      <div className="sticky top-0 z-20 bg-gray-100 pb-6 pt-4">
        <Label className="pr-5 text-2xl font-bold">Find a Team</Label>
        <Toolbar data={data ?? []} setSearch={setSearch} />
      </div>
      <div ref={ref} className="h-full">
        {search.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            No Teams Available
          </div>
        ) : (
          <div>
            {getVirtualItems().map(({ index }) => {
              if (index % 4) return null;
              const row = search.slice(index, index + 4);

              return (
                <div
                  key={`row: ${Math.floor(index / 4)}`}
                  className="mt-4 grid w-full grid-cols-4 gap-4"
                >
                  {row.map(({ title, languages, details, contact }, i) => (
                    <div
                      key={`column: ${i}`}
                      ref={measureElement}
                      data-index={index + i}
                    >
                      <Idea
                        title={title}
                        languages={languages}
                        description={details}
                        contact={contact}
                      />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Find;
