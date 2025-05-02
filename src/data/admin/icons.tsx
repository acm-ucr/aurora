import {
  Apple,
  Phone,
  Crown,
  School,
  User,
  Cake,
  BookOpen,
  Clock,
  Mail,
  Shirt,
  Calendar,
  MapPin,
} from "lucide-react";

import {
  SiDevpost as Devpost,
  SiGithub as Github,
  SiFigma as Figma,
} from "@icons-pack/react-simple-icons";

import type { JSX } from "react";

export const ICONS: Record<string, JSX.Element> = {
  github: (
    <Github className="mr-2 text-lg hover:text-hackathon-green-300 hover:opacity-75" />
  ),
  devpost: (
    <Devpost className="mr-2 text-lg hover:text-hackathon-green-300 hover:opacity-75" />
  ),
  figma: (
    <Figma className="mr-2 text-lg hover:text-hackathon-green-300 hover:opacity-75" />
  ),
  winner: <Crown className="ml-1 text-lg text-hackathon-yellow-100" />,
  phone: <Phone className="mr-2 text-hackathon-blue-200" />,
  email: <Mail className="mr-2 text-lg text-hackathon-blue-200" />,
  shirt: <Shirt className="mr-2 text-lg text-hackathon-blue-200" />,
  diet: <Apple className="mr-2 text-hackathon-blue-200" />,
  age: <Cake className="mr-2 text-lg text-hackathon-blue-200" />,
  gender: <User className="mr-2 text-lg text-hackathon-blue-200" />,
  grade: <School className="mr-2 text-lg text-hackathon-blue-200" />,
  major: <BookOpen className="mr-2 text-lg text-hackathon-blue-200" />,
  school: <School className="mr-2 text-lg text-hackathon-blue-200" />,
  country: <MapPin className="mr-2 text-lg text-hackathon-blue-200" />,
  eventSource: <Calendar className="mr-2 text-lg text-hackathon-blue-200" />,
  priorHackathons: <Clock className="mr-2 text-lg text-hackathon-blue-200" />,
};
