import { EventTypes } from "@/data/admin/calendar";

export type GoogleEvent = {
  id: string;
  description: string;
  end: {
    dateTime: string;
    timeZone: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  summary: string;
  location: string;
};

export type AuroraEvent = {
  summary: string;
  location: string;
  description: string;
  category: EventTypes;
  startDate: Date;
  endDate: Date;
  hidden: boolean;
  assignee: string;
  color: string;
};
