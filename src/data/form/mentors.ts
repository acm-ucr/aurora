import {
  CheckboxInput,
  Description,
  RadioInput,
  SelectInput,
  TermsAndConditions,
  TextareaInput,
  TextInput,
} from "@/types/forms";
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

type Fields = {
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
  response: TextareaInput;
  diet: RadioInput;
  requirements: TermsAndConditions;
};

type Attributes = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  discord: string;
  major: string;
  age: string;
  grade: string;
  availability: string[];
  gender: string;
  shirt: string;
  diet: string;
  response: string;
  requirements: string[];
};

export const FIELDS: Fields = {
  description: {
    input: "description",
    width: 12,
    texts: [
      `Welcome to ${
        data.name
      }. Thank you for considering to become a mentor, we appreciate your efforts to help support ${
        data.name
      }. ${data.name} is a ${data.description} hackathon spanning ${
        data.length
      } hours on ${data.date.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })}.`,
      "Mentors are not required to stay the full duration of the event, but are encouraged to checkout the various events, workshops, and opportunities that are available.",
      "Mentor duties include but are not limited to providing expertise and assistance to hackers throughout the hackathon without jeopardizing their chances at winning.",
      "Note: Mentors are not permitted to become participants for the hackathon.",
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
    type: "email",
    title: "Email Address",
    maxLength: 50,
    width: 12,
    editable: false,
    required: true,
    placeholder: "john.doe@gmail.com",
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
    type: "text",
    title: "Discord Username",
    placeholder: "ie. john_doe#1234",
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
    searchable: true,
    editable: true,
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
    searchable: true,
    editable: true,
  },
  availability: {
    input: "checkboxes",
    width: 12,
    field: "availability",
    text: "Availability",
    required: true,
    options: AVAILABILITY,
    editable: true,
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
  response: {
    input: "textarea",
    name: "response",
    rows: 4,
    title: "What skills and experience can you bring as a mentor?",
    placeholder: "ie. I can bring...",
    width: 12,
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
      "I understand this is an in person event taking place in UCR and I must attend in person in order to mentor",
    ],
  },
};

export const ATTRIBUTES: Attributes = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  discord: "",
  major: "",
  age: "",
  grade: "",
  availability: [],
  gender: "",
  shirt: "",
  diet: "",
  response: "",
  requirements: [],
};
