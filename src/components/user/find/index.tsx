"use client";

import { Label } from "@/components/ui/label";
import Toolbar from "../toolbar";
import Idea from "./idea";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import { api } from "@/utils/api";

interface idea {
  title: string;
  languages: string[];
  details: string;
  contact: string;
}

const Find = () => {
  const ref = useRef(null);
  const [ideas, setIdeas] = useState<idea[]>([]);
  const [search, setSearch] = useState<idea[]>([]);

  useEffect(() => {
    const getIdeas = async () => {
      const { items } = await api({
        url: "/api/dashboard/ideas",
        method: "GET",
      });
      setIdeas(items);
      setSearch(items);
    };

    getIdeas();
  }, []);

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

  return (
    <div className="flex h-[calc(100vh-48px)] w-full flex-col">
      <div className="pb-3 pt-4">
        <Label className="pr-5 text-2xl font-bold">Team</Label>
      </div>
      <Toolbar data={ideas} setSearch={setSearch} />
      <div ref={ref} className="relative h-full overflow-y-scroll">
        {search.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            No Teams Available
          </div>
        ) : (
          <div>
            {getVirtualItems().map(({ index, size, start }) => {
              if (index % 4) return null;
              const row = search.slice(index, index + 4);
              return (
                <div
                  key={`row: ${Math.floor(index / 4)}`}
                  className="absolute left-0 top-0 grid w-full grid-cols-4"
                  style={{
                    height: `${size}px`,
                    transform: `translateY(${start}px)`,
                  }}
                >
                  {row.map(({ title, languages, details, contact }, i) => (
                    <div
                      key={`column: ${i}`}
                      ref={measureElement}
                      data-index={index + i}
                      className="flex items-start p-2"
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
