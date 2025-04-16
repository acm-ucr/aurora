import {
  CheckboxInput,
  Description,
  RadioInput,
  SelectInput,
  TermsAndConditions,
  TextareaInput,
  TextInput,
  UploadInput,
} from "@/types/forms";
import {
  AGES,
  MAJORS,
  GRADES,
  GENDERS,
  SOURCES,
  DIETS,
  SHIRTS,
} from "./information";
import { SCHOOLS } from "./schools";
import data from "@/data/config";

interface Attributes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  major: string;
  age: string;
  school: string;
  grade: string;
  gender: string;
  shirt: string;
  resume: string;
  requirements: string[];
  priorHackathons: string[];
  discord: string;
  eventSource: string;
  priorExperience: string;
  response: string;
  diet: string;
}

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  major: "",
  age: "",
  school: "",
  grade: "",
  gender: "",
  shirt: "",
  resume: "",
  requirements: [],
  priorHackathons: [],
  discord: "",
  eventSource: "",
  priorExperience: "",
  response: "",
  diet: "",
};

interface Fields {
  description: Description;
  firstName: TextInput;
  lastName: TextInput;
  email: TextInput;
  phone: TextInput;
  discord: TextInput;
  major: SelectInput;
  age: SelectInput;
  school: SelectInput;
  grade: SelectInput;
  gender: RadioInput;
  shirt: RadioInput;
  eventSource: SelectInput;
  priorHackathons: CheckboxInput;
  priorExperience: TextareaInput;
  response: TextareaInput;
  resume: UploadInput;
  diet: RadioInput;
  requirements: TermsAndConditions;
}

export const FIELDS: Fields = {
  description: {
    input: "description",
    width: 12,
    texts: [
      `Welcome to ${data.name} ${
        data.date.getFullYear() + 1
      }. Thank you for considering to become a lead, we appreciate your enthusiasm to join ${
        data.name
      }, a ${data.description} hackathon.`,
    ],
  },
  firstName: {
    input: "input",
    name: "firstName",
    placeholder: "John",
    type: "text",
    title: "First Name",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
  },
  lastName: {
    input: "input",
    name: "lastName",
    placeholder: "Doe",
    type: "text",
    title: "Last Name",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
  },
  email: {
    input: "input",
    name: "email",
    placeholder: "john.doe@gmail.com",
    type: "email",
    title: "Email Address",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
  },
  phone: {
    input: "input",
    name: "phone",
    type: "phone",
    title: "Phone Number",
    placeholder: "ie. 123 456 7890",
    maxLength: 50,
    width: 12,
    editable: true,
    required: true,
  },
  discord: {
    input: "input",
    name: "discord",
    type: "text",
    title: "Discord Username",
    placeholder: "ie. john_doe#1234",
    maxLength: 50,
    width: 12,
    editable: true,
    required: true,
  },
  major: {
    input: "select",
    title: "Major",
    options: MAJORS,
    field: "major",
    placeholder: "ie. Computer Science",
    width: 12,
    required: true,
    editable: true,
    searchable: true,
  },
  age: {
    input: "select",
    title: "Age",
    options: AGES,
    field: "age",
    placeholder: "ie. 18",
    width: 12,
    required: true,
    editable: true,
    searchable: true,
  },
  school: {
    input: "select",
    title: "School",
    options: SCHOOLS,
    field: "school",
    placeholder: "ie. University of California, Riverside",
    width: 12,
    required: true,
    editable: true,
    searchable: true,
  },
  grade: {
    input: "select",
    title: "Grade",
    options: GRADES,
    field: "grade",
    placeholder: "ie. Undergraduate",
    width: 12,
    required: true,
    editable: true,
    searchable: true,
  },
  gender: {
    input: "radio",
    text: "Gender",
    options: GENDERS,
    field: "gender",
    width: 12,
    editable: true,
    required: true,
  },
  shirt: {
    input: "radio",
    text: "Shirt Size",
    options: SHIRTS,
    field: "shirt",
    width: 12,
    required: true,
    editable: true,
  },
  diet: {
    input: "radio",
    text: "Dietary Restrictions",
    width: 12,
    field: "diet",
    options: DIETS,
    required: true,
    editable: true,
  },
  eventSource: {
    input: "select",
    title: "How did you find the event?",
    options: SOURCES,
    field: "eventSource",
    placeholder: "ie. Social Media",
    width: 12,
    editable: true,
    searchable: true,
    required: true,
  },
  priorHackathons: {
    input: "checkboxes",
    text: "Prior Hackathons",
    field: "priorHackathons",
    width: 12,
    required: true,
    editable: true,
    options: [
      "Cutie Hack",
      "Rose Hack",
      "DesignVerse",
      "Bear Hack",
      "Citrus Hack",
      "MLH",
      "Other",
    ],
  },
  priorExperience: {
    input: "textarea",
    name: "priorExperience",
    rows: 4,
    title: "Please tell us about your prior experience",
    placeholder: "ie. I have prior experience in...",
    width: 12,
    required: true,
    editable: true,
  },
  response: {
    input: "textarea",
    name: "response",
    rows: 4,
    title: `Why do you want to join ${data.name}?`,
    placeholder: "ie. I want to join because...",
    width: 12,
    required: true,
    editable: true,
  },
  resume: {
    input: "upload",
    field: "resume",
    text: "Upload Resume",
    width: 12,
    types: ["pdf"],
    maxSize: [200, "KB"],
    editable: true,
    required: false,
  },
  requirements: {
    text: "Terms and Conditions",
    input: "terms",
    width: 12,
    field: "requirements",
    required: true,
    editable: true,
    options: [
      "I have read the MLH code of conduct and agree to the terms and conditions listed",
      "I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy",
      "I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy",
      "I consent to photographs being taken and being used for marketing purposes",
      "I consent to providing a safe space for hackers to learn and grow their interests in computing",
      "I consent to following the provided guidelines and rules instructed by the organizing team",
      "I understand that failure to comply with guidelines or creating an unsafe space will result in my removal from the event",
      "I understand this is an in person event taking place in UCR and I must attend in person in order to participate",
    ],
  },
};
