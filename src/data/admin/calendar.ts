interface types {
  color: string;
  background: string;
  type: string;
}

export type EventTypes =
  | "all"
  | "other"
  | "directors"
  | "marketing"
  | "operations"
  | "sponsorship"
  | "recruitment"
  | "software"
  | "uiux"
  | "leads"
  | "workshop"
  | "general"
  | "food"
  | "social"
  | "activities";

export const LABELS: Record<EventTypes, types> = {
  all: {
    color: "red",
    background: "!bg-hackathon-tags-red-text",
    type: "leads",
  },
  directors: {
    color: "red",
    background: "!bg-hackathon-tags-red-text",
    type: "leads",
  },
  marketing: {
    color: "yellow",
    background: "!bg-hackathon-tags-yellow-text",
    type: "leads",
  },
  operations: {
    color: "green",
    background: "!bg-hackathon-tags-green-text",
    type: "leads",
  },
  sponsorship: {
    color: "purple",
    background: "!bg-hackathon-tags-purple-text",
    type: "leads",
  },
  recruitment: {
    color: "teal",
    background: "!bg-hackathon-tags-teal-text",
    type: "leads",
  },
  software: {
    color: "teal",
    background: "!bg-hackathon-tags-teal-text",
    type: "leads",
  },
  uiux: {
    color: "lightgreen",
    background: "!bg-hackathon-tags-lightgreen-text",
    type: "leads",
  },
  leads: {
    color: "red",
    background: "!bg-hackathon-tags-red-text",
    type: "leads",
  },
  other: {
    color: "gray",
    background: "!bg-hackathon-tags-gray-text",
    type: "leads",
  },
  workshop: {
    color: "grayblue",
    background: "!bg-hackathon-tags-grayblue-text",
    type: "hackathon",
  },
  general: {
    color: "pink",
    background: "!bg-hackathon-tags-pink-text",
    type: "hackathon",
  },
  food: {
    color: "yellow",
    background: "!bg-hackathon-tags-yellow-text",
    type: "hackathon",
  },
  social: {
    color: "red",
    background: "!bg-hackathon-tags-red-text",
    type: "hackathon",
  },
  activities: {
    color: "yellow",
    background: "!bg-hackathon-tags-yellow-text",
    type: "hackathon",
  },
};
