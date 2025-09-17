"use client";
import { api } from "@/utils/api";
import { useState } from "react";
import { Trash2, RotateCcw } from "lucide-react";
import toaster from "@/utils/toaster";
import Select from "@/components/select";
import { InputWithClear } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { COLORS } from "@/data/tags";
import { cn } from "@/utils/tailwind";

import { useQueryClient } from "@tanstack/react-query";

const Toolbar = ({
  page,
  filters,
  setFilters,
  data,
  setData,
  setExpanded,
  tags,
  getFilteredSelectedRowModel,
  toggleAllRowsSelected,
  searchableItems,
  searchParams,
  refetch,
  meta,
}) => {
  const queryClient = useQueryClient();

  const selectedRows = getFilteredSelectedRowModel();
  const [search, setSearch] = useState({
    search: searchableItems[0],
  });

  const rows = selectedRows.rows.map(({ original }) => original);

  const [popup, setPopup] = useState({
    title: "",
    text: "",
    color: "",
    visible: false,
    onClick: () => {},
    button: "",
  });

  const handleReload = () => {
    queryClient.resetQueries({ queryKey: [page, searchParams] });
    setExpanded({});
    toggleAllRowsSelected(false);
    refetch();
    toaster(
      `Fetched ${page.charAt(0).toUpperCase() + page.slice(1)} Successfully`,
      "success",
    );
  };

  const handleDelete = async () => {
    const ids = rows.map(({ uid }) => uid);

    const previousData = data;
    const keep = data.filter(({ uid }) => !ids.includes(uid));
    setData(keep);

    setExpanded({});

    try {
      await api({
        method: "DELETE",
        url: `/api/dashboard/${page}`,
        body: rows.map(({ uid, shirt, diet, gender, age }) => ({
          uid,
          shirt,
          diet,
          gender,
          age,
        })),
      });

      queryClient.invalidateQueries({ queryKey: [page, searchParams] });
      toaster("Successfully Deleted", "success");
      toggleAllRowsSelected(false);
    } catch {
      setData(previousData);
      toaster("Deletion Failed. Please try again", "error");
    }
  };

  const confirmDelete = () => {
    if (rows.length === 0) {
      toaster("No rows selected for deletion", "error");
      return;
    }

    setPopup({
      title: "Delete Confirmation",
      text: "Are you sure you want to delete these row(s)? This action is irreversible.",
      color: "red",
      visible: true,
      onClick: handleDelete,
      button: "Confirm",
    });
  };

  const onClick = async (value) => {
    if (rows.length === 0) {
      toaster("No items selected.", "error");
      return;
    }

    const notPending = rows.some((obj) => obj.status !== 0);

    if (notPending) {
      toaster("Only pending items can be changed!", "error");
      toggleAllRowsSelected(false);
      return;
    }

    const ids = rows.map(({ uid }) => uid);
    const previousData = data;
    const keep = data.map((item) => {
      if (ids.includes(item.uid)) {
        return { ...item, status: value };
      }
      return item;
    });
    setData(keep);

    try {
      await api({
        method: "PUT",
        url: `/api/dashboard/${page}`,
        body: {
          objects: rows,
          status: value,
          attribute: "status",
        },
      });

      queryClient.invalidateQueries({ queryKey: [page, searchParams] });
      toggleAllRowsSelected(false);
      toaster("Operation Completed", "success");
    } catch {
      setData(previousData);
      toaster("Operation Failed", "error");
    }
  };

  const value = filters.find(({ id }) => id === search.search)?.value || "";

  const onChange = (id, value) =>
    setFilters((prev) =>
      prev.filter(({ id }) => id !== search.search).concat({ id, value }),
    );

  return (
    <div className="my-2 flex w-full flex-col items-center gap-3 lg:flex-row">
      <div className="flex gap-3">
        {tags.map((tag, index) => (
          <Button
            key={index}
            onClick={() => onClick(tag.value)}
            className={cn(
              COLORS[tag.text]?.background,
              COLORS[tag.text]?.text,
              COLORS[tag.text]?.hover,
              "text-nowrap capitalize",
            )}
          >
            {tag.text}
          </Button>
        ))}
      </div>

      <div className="flex w-full items-center gap-2 lg:flex-row">
        <div className="z-10 w-2/12">
          <Select
            items={searchableItems}
            user={search}
            setUser={setSearch}
            field="search"
            placeholder={searchableItems[0]}
          />
        </div>

        <InputWithClear
          placeholder="Search"
          maxLength={100}
          onClear={() => onChange(search.search, "")}
          onChange={(e) => onChange(search.search, e.target.value)}
          value={value}
        />

        <div>
          Rows:<span className="mx-2">{meta.total}</span>
        </div>
        <RotateCcw
          size={30}
          onClick={handleReload}
          className="text-hackathon-gray-300 duration-150 hover:cursor-pointer hover:opacity-70"
        />
        <Trash2
          onClick={confirmDelete}
          size={30}
          className="mx-2 text-hackathon-gray-300 duration-150 hover:cursor-pointer hover:opacity-70"
        />
      </div>

      <AlertDialog open={popup.visible}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>{popup.text}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setPopup({ ...popup, visible: false })}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                popup.onClick();
                setPopup({ ...popup, visible: false });
              }}
            >
              {popup.button}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Toolbar;
