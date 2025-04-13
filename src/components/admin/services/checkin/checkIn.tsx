"use client";
import { useState } from "react";
import Scanner from "./scanner";
import Select from "@/components/select";
import toaster from "@/utils/toaster";
import { api } from "@/utils/api";
import { getEvents, getUser } from "./actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GoogleEvent } from "@/types/calendar";

interface CheckInPayload {
  uid: string;
  event: string;
  name: string;
}

const CheckIn = () => {
  const [event, setEvent] = useState<GoogleEvent | null>(null);
  const [code, setCode] = useState("");
  const queryClient = useQueryClient();

  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: async () => getEvents(),
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: (body: CheckInPayload) =>
      api({
        method: "PUT",
        url: "/api/checkin",
        body,
      }),
    onSuccess: () => {
      toaster(`Checked in for ${event?.summary}`, "success");
    },
    onError: (error) => {
      toaster(`Error checking in! ${error}`, "error");
    },
  });

  const setResult = (result: string) => {
    if (result !== code) {
      setCode(result);
      toaster("QR Code Scanned", "success");
    }
  };

  const handleCheckIn = () => {
    if (event?.summary === "No events") {
      toaster("Please select an event!", "error");
      return;
    }
    if (!code) {
      toaster("Please scan a valid QR code!", "error");
      return;
    }

    const [userId, date] = code.split("&");

    const delta =
      process.env.NODE_ENV === "development"
        ? Math.round(new Date().getTime() - new Date(date).getTime()) / 1000
        : Math.round(new Date().getTime() - new Date(date).getTime());

    if (delta < 5000) {
      queryClient
        .fetchQuery({
          queryKey: ["/admin/checkin/user", userId],
          queryFn: () => getUser(userId),
          staleTime: 0,
        })
        .then((userData) => {
          if (event === null) {
            toaster("No Event Selected!", "error");
            return;
          }
          if (userData.includes(event.id)) {
            toaster("Already Checked In!", "error");
          } else {
            mutation.mutate({
              uid: userId,
              event: event.id,
              name: event.summary,
            });
          }
        })
        .catch((_) => {
          toaster("Error Fetching User Data!", "error");
        });
    } else {
      toaster("Expired QR code!", "error");
      return;
    }
  };

  return (
    <div className="flex h-full flex-col gap-3 py-4 font-poppins">
      <Label className="pr-5 text-2xl font-bold">Checkin</Label>
      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full flex-col gap-3 overflow-hidden py-3">
          {events && (
            <Select
              items={events.map((event: GoogleEvent) => ({
                ...event,
                name: event.summary,
              }))}
              user={event}
              setUser={setEvent}
              placeholder="Select Events"
              userFn={(event) => setEvent(event)}
              field={null}
              title={null}
              required={null}
            />
          )}
          <Scanner setResult={setResult} />
        </div>
        <div>{code && code.split("&")[2]}</div>
        <Button className="w-fit" onClick={handleCheckIn}>
          Check In
        </Button>
      </div>
    </div>
  );
};

export default CheckIn;
