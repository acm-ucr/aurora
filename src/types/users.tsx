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
  }[];
};
