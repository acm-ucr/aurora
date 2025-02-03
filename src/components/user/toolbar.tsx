"use client";
import { InputWithClear } from "@/components/ui/input";
import React, { useState } from "react";

interface props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSearch: (value: any[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

const Toolbar = ({ data, setSearch }: props) => {
  const [inputValue, setInputValue] = useState("");
  const onChange = (value: string) => {
    setInputValue(value);
    if (value === "") {
      setSearch(data);
    } else {
      const filter = data.filter(
        ({ title, languages }) =>
          title.toLowerCase().includes(value.toLowerCase()) ||
          languages.some((language: string) =>
            language.toLowerCase().includes(value.toLowerCase()),
          ),
      );
      setSearch(filter);
    }
  };

  return (
    <InputWithClear
      id="search"
      placeholder="Search"
      onClear={() => onChange("")}
      value={inputValue}
      onChange={(e) => onChange(e.target.value)}
      maxLength={100}
    />
  );
};

export default Toolbar;
