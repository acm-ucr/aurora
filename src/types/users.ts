import { StatusMapping } from "@/data/statuses";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  status: StatusMapping;
};

export type Admin = {
  gender: string;
  major: string;
  diet: string;
  grade: string;
  discord: string;
  affiliation:
    | "director"
    | "marketing"
    | "sponsorship"
    | "recruitment"
    | "software"
    | "uiux"
    | "operations"
    | "student";
  shirt: string;
} & User;

export type Committee = {
  discord: string;
  shirt: string;
  grade: string;
  affiliation:
    | "director"
    | "marketing"
    | "sponsorship"
    | "recruitment"
    | "software"
    | "uiux"
    | "operations"
    | "student";
} & User;

export type Interest = {
  eventSource: string;
} & User;

export type Judge = {
  photo: string;
  title: string;
  affiliation:
    | "director"
    | "marketing"
    | "sponsorship"
    | "recruitment"
    | "software"
    | "uiux"
    | "operations"
    | "student";
} & User;

export type Lead = {
  grade: string;
  discord: string;
} & User;

export type Mentor = {
  grade: string;
  discord: string;
} & User;

export type Panelist = {
  availability: string[];
  response: string;
} & User;

export type Participant = {
  phone: string;
  major: string;
  age: number;
  country: string;
  school: string;
  grade: string;
  gender: string;
  diet: string;
  roles: string;
  team: string;
  discord: string;
} & User;

export type Resume = {
  school: string;
  grade: string;
  resume: string;
} & User;

export type Sponsor = {
  company: string;
  position: string;
  tier: string;
  comments: string;
  tiers: string[];
} & User;

export type Volunteer = {
  discord: string;
  major: string;
  grade: string;
  availability: string[];
  gender: string;
  shirt: string;
} & User;

export type Team = {
  id: string;
  name: string;
  members: {
    name: string;
    discord: string;
  }[];
  discords: string[];
  links: {
    name: string;
    link: string;
    devpost: string;
    github: string;
    figma: string;
  }[];
};
