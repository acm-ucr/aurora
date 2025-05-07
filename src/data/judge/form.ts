import { SliderInput, ToggleInput } from "@/types/forms";
const TRACKS = ["Beginner", "Sustainable", "Women", "Data", "UI/UX"];
interface Fields {
  tracks: ToggleInput;
  implementation: SliderInput;
  idea: SliderInput;
  design: SliderInput;
}
export const FIELDS: Fields = {
  tracks: {
    input: "toggle",
    width: 12,
    field: "tracks",
    title: "Tracks",
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
