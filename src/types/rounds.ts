export type Round = {
  name: string;
  affiliation: string;
  uid: "string";
  feedback: Feedback;
};

export type Feedback = { tracks: string[] } & {
  [question: string]: { rating: number; comment: string };
};
