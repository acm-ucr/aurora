interface Input {
  width: number;
  required: boolean;
  editable: boolean;
}
export interface Description {
  input: string;
  width: number;
  texts: string[];
}
export type TextInput = Input & {
  input: "input";
  title: string;
  placeholder: string;
  maxLength: number;
  name: string;
  width: number;
  type: string;
  editable: boolean;
  required: boolean;
};
export type SelectInput = Input & {
  input: "select";
  title: string;
  options: string[];
  field: string;
  placeholder: string;
  searchable: boolean;
};
export type RadioInput = Input & {
  input: "radio";
  text: string;
  options: string[];
  field: string;
};
export type CheckboxInput = Input & {
  input: "checkboxes";
  text: string;
  field: string;
  options: string[];
};
export type ToggleInput = Input & {
  input: "toggle";
  title: string;
  field: string;
  options: string[];
};
export type SliderInput = Input & {
  input: "slider";
  title: string;
  field: string;
  question: string;
};
export type TextareaInput = Input & {
  input: "textarea";
  name: string;
  rows: number;
  title: string;
  placeholder: string;
};
export type UploadInput = Input & {
  input: "upload";
  field: string;
  text: string;
  types: string[];
  maxSize: [number, string];
};
export type TermsAndConditions = Input & {
  input: "terms";
  text: string;
  field: string;
  options: string[];
};
