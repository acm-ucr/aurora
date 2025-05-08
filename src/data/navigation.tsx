import {
  User,
  Users,
  FileUser,
  BarChart,
  Hand,
  Heart,
  MessagesSquare,
  Handshake,
  MonitorCog,
  Mail,
  Lock,
  Calendar,
  AlertCircle,
  Search,
  Settings,
  QrCode,
  HandHeart,
  Gavel,
  Timer,
  Newspaper,
  Code,
  Globe,
  FileSearch,
  FolderSearch2,
  HandCoins,
  Cat,
  Notebook,
} from "lucide-react";
import data from "./config";
import { SiInstagram } from "@icons-pack/react-simple-icons";

const iconStyle = "mr-2 w-4 h-4";

interface Tab {
  name: string;
  link: string;
  icon: JSX.Element;
  target: string;
}

interface Service {
  expand: true;
  tabs: Tab[];
}

type Tabs = Record<string, Record<string, Service>>;

export const TABS: Tabs = {
  admin: {
    Dashboards: {
      expand: true,
      tabs: [
        {
          name: "Admins",
          link: "/admin/dashboard/admins",
          icon: <Lock className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Committees",
          link: "/admin/dashboard/committees",
          icon: <Handshake className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Feedback",
          link: "/admin/dashboard/feedback",
          icon: <MessagesSquare className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Interests",
          link: "/admin/dashboard/interests",
          icon: <AlertCircle className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Judges",
          link: "/admin/dashboard/judges",
          icon: <Gavel className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Leads",
          link: "/admin/dashboard/leads",
          icon: <Hand className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Mentors",
          link: "/admin/dashboard/mentors",
          icon: <HandHeart className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Panels",
          link: "/admin/dashboard/panels",
          icon: <Cat className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Participants",
          link: "/admin/dashboard/participants",
          icon: <User className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Resumes",
          link: "/admin/dashboard/resumes",
          icon: <FileUser className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Sponsors",
          link: "/admin/dashboard/sponsors",
          icon: <HandCoins className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Teams",
          link: "/admin/dashboard/teams",
          icon: <Users className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Volunteers",
          link: "/admin/dashboard/volunteers",
          icon: <Heart className={iconStyle} />,
          target: "_self",
        },
      ],
    },
    Services: {
      expand: true,
      tabs: [
        {
          name: "Calendar",
          link: "/admin/services/calendar",
          icon: <Calendar className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Contacts",
          link: "/admin/services/contacts",
          icon: <Mail className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Checkin",
          link: "/admin/services/checkin",
          icon: <QrCode className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Judging",
          link: "/admin/services/judging",
          icon: <MonitorCog className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Notes",
          link: "/admin/services/notes",
          icon: <Notebook className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Statistics",
          link: "/admin/services/statistics",
          icon: <BarChart className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Settings",
          link: "/admin/services/settings",
          icon: <Settings className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Timer",
          link: "/admin/services/timer",
          icon: <Timer className={iconStyle} />,
          target: "_self",
        },
      ],
    },
    Links: {
      expand: true,
      tabs: [
        {
          name: "Feedback",
          link: "/apply/feedback",
          icon: <Search className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Website",
          link: "/",
          icon: <Globe className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Devpost",
          link: data.devpost,
          icon: <Code className={iconStyle} />,
          target: "_blank",
        },
        {
          name: "Instagram",
          link: data.instagram,
          icon: <SiInstagram className={iconStyle} />,
          target: "_blank",
        },
      ],
    },
  },
  user: {
    Portal: {
      expand: true,
      tabs: [
        {
          name: "Dashboard",
          link: "/user/dashboard",
          icon: <User className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Checkin",
          link: "/user/checkin",
          icon: <QrCode className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Schedule",
          link: "/user/schedule",
          icon: <Calendar className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Team",
          link: "/user/team",
          icon: <Users className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Resources",
          link: "/resources",
          icon: <Newspaper className={iconStyle} />,
          target: "_blank",
        },
        {
          name: "Find a Team",
          link: "/user/find",
          icon: <Search className={iconStyle} />,
          target: "_self",
        },
      ],
    },
    Forms: {
      expand: true,
      tabs: [
        {
          name: "Post Team Idea",
          link: "/form/idea",
          icon: <FolderSearch2 className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Feedback",
          link: "/form/feedback",
          icon: <FileSearch className={iconStyle} />,
          target: "_self",
        },
      ],
    },
    Links: {
      expand: true,
      tabs: [
        {
          name: "Website",
          link: "/",
          icon: <Globe className={iconStyle} />,
          target: "_self",
        },
        {
          name: "Devpost",
          link: data.devpost,
          icon: <Code className={iconStyle} />,
          target: "_blank",
        },
        {
          name: "Instagram",
          link: data.instagram,
          icon: <SiInstagram className={iconStyle} />,
          target: "_blank",
        },
      ],
    },
  },
};
