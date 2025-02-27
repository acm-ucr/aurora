"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { api } from "@/utils/api";
import toast from "react-hot-toast";

const Settings = () => {
  const syncStatsWithDatabase = () => {
    toast.promise(
      api({
        method: "GET",
        url: "/api/settings",
      }),
      {
        loading: "Loading",
        success: "Statistics Synced",
        error: "Failed to Sync",
      },
    );
  };

  return (
    <div className="flex h-full flex-col py-4 font-poppins">
      <Label className="pr-5 text-2xl font-bold">Settings</Label>

      <Button onClick={syncStatsWithDatabase}>Sync Stats</Button>
    </div>
  );
};

export default Settings;
