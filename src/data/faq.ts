type QuestionAnswer = {
  question: string;
  answer: string;
};

export const QUESTIONS: QuestionAnswer[] = [
  {
    question: "What is hackathon website?",
    answer:
      "This repo centralizes the backbone for all websites. It serves as a template for mainly the backend, user registration, user dashboard and admin portal for organizers. The frontend is built out by respective hackathon committees.",
  },
  {
    question: "How do I join the committee?",
    answer:
      "No experience is required. You can reach out to us on discord and start working! We have weekly meetings and tasks via GitHub",
  },
  {
    question: "How to get started with coding?",
    answer:
      "Attend weekly meetings for full onboarding. You can clone the repo, install necesssary packages with `npm i`(download node.js first). You would need to reach out to a swe lead for repo secrets file. Follow the steps on the readme for more.",
  },
];
