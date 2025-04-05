"use client";
import { HACKPACKS } from "@/data/user/hackpacks";
import Toolbar from "../user/toolbar";
import Hackpack from "./hackpack";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const Resources = () => {
  const [search, setSearch] = useState(HACKPACKS);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="sticky top-0 z-20 bg-gray-100 pb-6 pl-5 pt-4">
        <Label className="pr-5 text-2xl font-bold">Resources</Label>
        <Toolbar data={HACKPACKS} setSearch={setSearch} />
      </div>

      <div className="mt-2 grid grid-cols-4 gap-4 px-4">
        {search.map(({ title, languages, link, description }, index) => (
          <Hackpack
            key={index}
            text={title}
            languages={languages}
            link={link}
            description={description}
          />
        ))}
      </div>
    </div>
  );
};

export default Resources;
