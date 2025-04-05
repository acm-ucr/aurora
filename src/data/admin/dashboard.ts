interface attributes {
  admins: string[];
  committees: string[];
  judges: string[];
  mentors: string[];
  volunteers: string[];
  interests: string[];
  participants: string[];
  resumes: string[];
  sponsors: string[];
  panels: string[];
  feedback: string[];
  leads: string[];
}

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

export const ATTRIBUTES: attributes = {
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
    "name",
    "email",
    "roles",
    "discord",
    "team",
  ],
  resumes: ["name", "email", "school", "grade", "resume", "status"],
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
