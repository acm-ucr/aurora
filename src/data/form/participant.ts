import {
  Description,
  RadioInput,
  SelectInput,
  TermsAndConditions,
  TextInput,
  UploadInput,
} from "@/types/forms";
import { AGES, DIETS, MAJORS } from "./information";
import { GRADES } from "./information";
import { GENDERS } from "./information";
import { SHIRTS } from "./information";
import { SCHOOLS } from "./schools";
import data from "@/data/config";
import { COUNTRIES } from "./countries";

interface Attributes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  major: string;
  age: string;
  country: string;
  school: string;
  grade: string;
  gender: string;
  shirt: string;
  diet: string;
  resume: string;
  requirements: string[];
  team: string;
  discord: string;
  mlh: boolean;
}

interface Fields {
  description: Description;
  firstName: TextInput;
  lastName: TextInput;
  email: TextInput;
  phone: TextInput;
  discord: TextInput;
  major: SelectInput;
  age: SelectInput;
  country: SelectInput;
  school: SelectInput;
  grade: SelectInput;
  gender: RadioInput;
  shirt: RadioInput;
  diet: RadioInput;
  resume: UploadInput;
  requirements: TermsAndConditions;
}

export const FIELDS: Fields = {
  description: {
    input: "description",
    width: 12,
    texts: [
      `Welcome to ${
        data.name
      }. Thank you for considering to become a participant, we appreciate your enthusiasm to join ${
        data.name
      }. ${data.name} is a ${data.description} hackathon spanning ${
        data.length
      } hours on ${data.date.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}.`,
      "Participants are not required to stay the full duration of the event, but are encouraged to checkout the various events, workshops, and opportunities that are available.",
    ],
  },
  firstName: {
    input: "input",
    name: "firstName",
    type: "text",
    title: "First Name",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
    placeholder: "John",
  },
  lastName: {
    input: "input",
    name: "lastName",
    type: "text",
    title: "Last Name",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
    placeholder: "Doe",
  },
  email: {
    input: "input",
    name: "email",
    placeholder: "John Doe",
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
    required: true,
    editable: true,
  },
  discord: {
    input: "input",
    name: "discord",
    placeholder: "John Doe",
    type: "text",
    title: "Discord Username",
    maxLength: 50,
    width: 12,
    required: true,
    editable: true,
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
  country: {
    input: "select",
    title: "Country",
    options: COUNTRIES,
    field: "country",
    placeholder: "ie. United States of America",
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
    required: true,
    editable: true,
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
  resume: {
    input: "upload",
    field: "resume",
    text: "Upload  Resume",
    width: 12,
    types: ["pdf"],
    maxSize: [200, "KB"],
    required: false,
    editable: true,
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

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  major: "",
  age: "",
  country: "",
  school: "",
  grade: "",
  gender: "",
  shirt: "",
  diet: "",
  resume: "",
  requirements: [],
  team: "",
  discord: "",
  mlh: false,
};
