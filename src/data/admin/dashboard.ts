type keys =
  | "admins"
  | "committees"
  | "judges"
  | "mentors"
  | "volunteers"
  | "interests"
  | "participants"
  | "resumes"
  | "sponsors"
  | "panels"
  | "feedback"
  | "leads";

export const ATTRIBUTES: Record<keys, string[]> = {
  admins: [
    "firstName",
    "lastName",
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
    "firstName",
    "lastName",
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
    "firstName",
    "lastName",
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
    "firstName",
    "lastName",
    "email",
    "discord",
    "availability",
    "response",
    "age",
    "diet",
  ],
  volunteers: [
    "firstName",
    "lastName",
    "email",
    "discord",
    "availability",
    "response",
    "age",
    "diet",
  ],
  interests: [
    "firstName",
    "lastName",
    "email",
    "age",
    "diet",
    "gender",
    "shirt",
  ],
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
    "firstName",
    "lastName",
    "email",
    "roles",
    "discord",
    "team",
  ],
  resumes: [
    "firstName",
    "lastName",
    "email",
    "school",
    "grade",
    "resume",
    "status",
  ],
  sponsors: [
    "firstName",
    "lastName",
    "email",
    "phone",
    "company",
    "position",
    "tier",
    "comments",
  ],
  panels: [
    "firstName",
    "lastName",
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
    "firstName",
    "lastName",
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
