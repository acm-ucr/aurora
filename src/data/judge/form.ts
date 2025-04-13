import { CheckboxInput, SliderInput } from "@/types/forms";

const TRACKS = ["Beginner", "Sustainable", "Women", "Data", "UI/UX"];

interface Fields {
  tracks: CheckboxInput;
  implementation: SliderInput;
  idea: SliderInput;
  design: SliderInput;
}

export const FIELDS: Fields = {
  tracks: {
    input: "checkboxes",
    width: 12,
    field: "tracks",
    text: "Tracks",
    required: true,
    options: TRACKS,
    editable: true,
  },
  implementation: {
    input: "slider",
    title: "IMPLEMENTATION",
    width: 12,
    field: "implementation",
    editable: false,
    required: true,
    question: "Describe the complexity of the project.",
  },
  idea: {
    input: "slider",
    title: "IDEA",
    width: 12,
    field: "idea",
    editable: false,
    required: true,
    question: "Was the idea orignal or creative?",
  },
  design: {
    input: "slider",
    title: "DESIGN",
    width: 12,
    field: "design",
    editable: false,
    required: true,
    question: "How user-friendly is this project?",
  },
};

export const QUESTIONS = [
  {
    title: "Implementation",
    question: "Describe the complexity of the project.",
    rating: 4,
  },
  {
    title: "IDEA",
    question: "Was the idea orignal or creative?",
    rating: 2,
  },
  {
    title: "Design",
    question: "How user-friendly is this project?",
    rating: 3,
  },
];
