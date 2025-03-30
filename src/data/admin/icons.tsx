import {
  Apple,
  Phone,
  // Crown,
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
  phone: <Phone className="mr-2 text-hackathon-primary" />,
  email: <Mail className="mr-2 text-lg text-hackathon-primary" />,
  shirt: <Shirt className="mr-2 text-lg text-hackathon-primary" />,
  diet: <Apple className="mr-2 text-hackathon-primary" />,
  age: <Cake className="mr-2 text-lg text-hackathon-primary" />,
  gender: <User className="mr-2 text-lg text-hackathon-primary" />,
  grade: <School className="mr-2 text-lg text-hackathon-primary" />,
  major: <BookOpen className="mr-2 text-lg text-hackathon-primary" />,
  school: <School className="mr-2 text-lg text-hackathon-primary" />,
  country: <MapPin className="mr-2 text-lg text-hackathon-primary" />,
  eventSource: <Calendar className="mr-2 text-lg text-hackathon-primary" />,
  priorHackathons: <Clock className="mr-2 text-lg text-hackathon-primary" />,
};
