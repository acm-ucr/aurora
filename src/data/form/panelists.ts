import { GENDERS } from "./information";
import { SHIRTS } from "./information";
import data from "@/data/config";

export const PANELISTS = {
  professor: "Professor",
  intern: "Intern",
  researcher: "Researcher",
};

export const FIELDS = {
  description: {
    input: "description",
    width: 12,
    texts: [
      `Welcome to ${
        data.name
      }. Thank you for considering to become a panelist. We appreciate your efforts to help support ${
        data.name
      }. ${data.name} is a ${data.description} hackathon spanning ${
        data.length
      } hours on ${data.date.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}.`,
      "Panelists are not required to stay the full duration of the event, but are encouraged to checkout the various events, workshops, and opportunities that are available.",
    ],
  },
  firstName: {
    input: "input",
    name: "firstName",
    type: "text",
    title: "First name",
    placeholder: "John",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
  },
  lastName: {
    input: "input",
    name: "lastName",
    type: "text",
    title: "Last name",
    placeholder: "Doe",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
  },
  email: {
    input: "input",
    name: "email",
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
  panelist: {
    input: "radio",
    text: "Panelist Role",
    options: PANELISTS,
    field: "panelist",
    width: 12,
    required: true,
  },
  company: {
    input: "input",
    name: "company",
    type: "text",
    title: "Company",
    placeholder: "ie. UBER",
    maxLength: 50,
    width: 12,
    required: true,
    editable: true,
  },

  title: {
    input: "input",
    name: "title",
    type: "text",
    title: "Title",
    placeholder: "ie. SWE",
    maxLength: 50,
    width: 12,
    required: true,
    editable: true,
  },
  gender: {
    input: "radio",
    text: "Gender",
    options: GENDERS,
    field: "gender",
    width: 12,
    required: true,
  },
  shirt: {
    input: "radio",
    text: "Shirt Size",
    options: SHIRTS,
    field: "shirt",
    width: 12,
    required: true,
  },

  photo: {
    input: "upload",
    field: "photo",
    text: "Upload Photo",
    width: 12,
    types: ["png", "jpg", "jpeg"],
    maxSize: [1, "MB"],
    required: true,
  },
  requirements: {
    text: "Terms and Conditions",
    input: "terms",
    width: 12,
    field: "requirements",
    required: true,
    options: [
      "I have read the MLH code of conduct and agree to the terms and conditions listed",
      "I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, and MLH administration in-line with the MLH Privacy Policy",
      "I further agree to the terms of both the MLH Contest Terms and Conditions and the MLH Privacy Policy",
      "I consent to photographs being taken and being used for marketing purposes",
      "I consent to providing a safe space for hackers to learn and grow their interests in computing",
      "I consent to following the provided guidelines and rules instructed by the organizing team",
      "I understand that failure to comply with guidelines or creating an unsafe space will result in my removal from the event",
      "I understand this is an in person event taking place in UCR and I must attend in person in order to judge",
    ],
  },
};

interface Attributes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  shirt: string;
  title: string;
  photo: string;
  requirements: string[];
  company: string;
  panelist: "Intern" | "Professor" | "Researcher";
}

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "",
  shirt: "",
  title: "",
  photo: "",
  requirements: [],
  company: "",
  panelist: "Intern",
};
