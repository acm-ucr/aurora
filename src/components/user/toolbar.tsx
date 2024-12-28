import { InputWithClear } from "@/components/ui/input";
import React from "react";

interface props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSearch: (value: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

const Toolbar = ({ data, setSearch }: props) => {
  const [searchValue, setSearchValue] = React.useState("");
  const onChange = (value: string) => {
    setSearchValue(value);
    if (value === "") {
      setSearch(data);
    } else {
      const filter = data.filter(
        ({ text, languages }) =>
          text.toLowerCase().includes(value.toLowerCase()) ||
          languages.some((tech: string) =>
            tech.toLowerCase().includes(value.toLowerCase()),
          ),
      );
      setSearch(filter);
    }
  };

  return (
    <InputWithClear
      id="search"
      placeholder="Search"
      value={searchValue}
      onClear={() => onChange("")}
      onChange={(e) => onChange(e.target.value)}
      maxLength={100}
    />
  );
};

export default Toolbar;
