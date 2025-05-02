import Link from "next/link";
import { ICONS } from "@/data/admin/icons";
import Loading from "@/components/loading";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

const Table = ({ data }) => {
  const team = data?.filter((group) => !group.hidden);
  const ref = useRef(null);
  const { measureElement, getVirtualItems } = useVirtualizer({
    count: team?.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 100,
    measureElement: (el) => {
      if (el.clientHeight > 100) return el.clientHeight;
      return 100;
    },
    lanes: 4,
    overscan: 4,
  });
  return team === null ? (
    <Loading />
  ) : (
    <div ref={ref} className="relative h-full overflow-y-scroll">
      {getVirtualItems().map((virtualItem) => {
        if (virtualItem.index % 4) return null;
        const row = team.slice(virtualItem.index, virtualItem.index + 4);
        return (
          <div
            key={`row: ${Math.floor(virtualItem.index / 4)}`}
            className="absolute top-0 left-0 grid w-full grid-cols-4"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {row.map((group, index) => (
              <div
                key={`column: ${index}`}
                className="flex items-start p-2"
                ref={measureElement}
                data-index={virtualItem.index + index}
              >
                <div className="w-full rounded-sm bg-white p-3">
                  <div className="flex items-center justify-between">
                    <Badge> {group.name}</Badge>
                    <div className="ml-2 flex w-full justify-start">
                      {group.links &&
                        group.links
                          .filter((l) => l.link.length)
                          .map((link, index) => (
                            <Link
                              key={index}
                              href={link.link}
                              target="_blank"
                              className="hover:text-hackathon-blue-100! m-0 p-0 text-xl text-black no-underline"
                            >
                              {ICONS[link.name]}
                            </Link>
                          ))}
                    </div>
                    {group.table && (
                      <p className="text-hackathon-green-300 mb-0 font-semibold whitespace-nowrap">
                        table {group.table}
                      </p>
                    )}
                  </div>
                  {group.rounds.map((judges, index) => (
                    <div key={index} className="my-2 flex items-center">
                      <p className="mr-2 mb-0 font-semibold">{index + 1}</p>
                      <div className="flex items-center">
                        {judges.map(({ name }, i) => {
                          return <Badge key={i}>{name}</Badge>;
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Table;
