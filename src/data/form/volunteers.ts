import {
  MAJORS,
  GRADES,
  GENDERS,
  SHIRTS,
  AVAILABILITY,
  AGES,
  DIETS,
} from "./information";
import data from "@/data/config";
import {
  CheckboxInput,
  Description,
  RadioInput,
  SelectInput,
  TermsAndConditions,
  TextInput,
} from "@/types/forms";

interface Fields {
  description: Description;
  firstName: TextInput;
  lastName: TextInput;
  email: TextInput;
  phone: TextInput;
  discord: TextInput;
  major: SelectInput;
  age: SelectInput;
  grade: SelectInput;
  availability: CheckboxInput;
  gender: RadioInput;
  shirt: RadioInput;
  diet: RadioInput;
  requirements: TermsAndConditions;
}

export const FIELDS: Fields = {
  description: {
    input: "description",
    width: 12,
    texts: [
      `Welcome to ${
        data.name
      }. Thank you for considering to become a volunteer, we appreciate your efforts to help support ${
        data.name
      }. ${data.name} is a ${data.description} hackathon spanning ${
        data.length
      } hours on ${data.date.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}.`,
      "Volunteers are not required to stay the full duration of the event, but are encouraged to checkout the various events, workshops, and opportunities that are available.",
      "Volunteer duties include but are not limited to setup, workshop organization, food handling, cleanup and more.",
      "Note: Volunteers are not permitted to become participants for the hackathon.",
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
    placeholder: "ie. john123",
    maxLength: 32,
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
  availability: {
    input: "checkboxes",
    width: 12,
    field: "availability",
    text: "Availability",
    required: true,
    editable: true,
    options: AVAILABILITY,
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
    editable: true,
    required: true,
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
      "I understand this is an in person event taking place in UCR and I must attend in person in order to volunteer",
    ],
  },
};

interface Attributes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  discord: string;
  major: string;
  grade: string;
  age: string;
  availability: string[];
  gender: string;
  shirt: string;
  response: string;
  diet: string;
  requirements: string[];
}

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  discord: "",
  major: "",
  grade: "",
  age: "",
  availability: [],
  gender: "",
  shirt: "",
  response: "",
  diet: "",
  requirements: [],
};
