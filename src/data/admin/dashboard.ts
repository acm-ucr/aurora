type keys =
  | "admins"
  | "committees"
  | "judges"
  | "mentors"
  | "volunteers"
  | "interests"
  | "participants"
  | "sponsors"
  | "panels"
  | "feedback"
  | "leads";

export const ATTRIBUTES: Record<keys, string[]> = {
  admins: [
    "name",
    "email",
    "age",
    "diet",
    "affiliation",
    "discord",
    "major",
    "grade",
    "gender",
    "shirt",
  ],
  committees: [
    "name",
    "email",
    "age",
    "affiliation",
    "discord",
    "major",
    "grade",
    "gender",
    "shirt",
    "diet",
  ],
  judges: [
    "name",
    "email",
    "phone",
    "age",
    "diet",
    "gender",
    "title",
    "affiliation",
    "shirt",
    "photo",
  ],
  mentors: [
    "name",
    "email",
    "discord",
    "availability",
    "response",
    "age",
    "diet",
  ],
  volunteers: [
    "name",
    "email",
    "discord",
    "availability",
    "response",
    "age",
    "diet",
  ],
  interests: ["name", "email", "age", "diet", "gender", "shirt"],
  participants: [
    "phone",
    "major",
    "age",
    "country",
    "school",
    "grade",
    "gender",
    "shirt",
    "diet",
    "resume",
    "name",
    "email",
    "roles",
    "discord",
    "team",
  ],
  sponsors: [
    "name",
    "email",
    "phone",
    "company",
    "position",
    "tier",
    "comments",
  ],
  panels: [
    "name",
    "email",
    "title",
    "gender",
    "title",
    "panelist",
    "shirt",
    "photo",
  ],
  feedback: [
    "rating",
    "additionalComments",
    "eventSource",
    "improvements",
    "notBeneficial",
    "helpful",
    "status",
  ],
  leads: [
    "name",
    "email",
    "grade",
    "gender",
    "major",
    "discord",
    "response",
    "eventSource",
    "school",
    "priorExperience",
    "priorHackathons",
    "age",
    "diet",
  ],
};

interface auth {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  POST: {};
  GET: {
    admins: number[];
  };
  PUT: {
    admins: number[];
  };
  DELETE: {
    admins: number[];
  };
}

export const AUTH: auth = {
  POST: {},
  GET: {
    admins: [1],
  },
  PUT: {
    admins: [1],
  },
  DELETE: {
    admins: [1],
  },
};
