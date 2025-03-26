import {
  User,
  Users,
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
} from "lucide-react";
import data from "./config";
import { SiInstagram } from "@icons-pack/react-simple-icons";

const iconStyle = "mr-2 w-4 h-4";

interface Tab {
  name: string;
  link: string;
  icon: JSX.Element;
  newTab: boolean;
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
          link: "/admin/admins",
          icon: <Lock className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Committees",
          link: "/admin/committees",
          icon: <Handshake className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Feedback",
          link: "/admin/feedback",
          icon: <MessagesSquare className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Interests",
          link: "/admin/interests",
          icon: <AlertCircle className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Judges",
          link: "/admin/judges",
          icon: <Gavel className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Leads",
          link: "/admin/leads",
          icon: <Hand className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Mentors",
          link: "/admin/mentors",
          icon: <HandHeart className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Panelists",
          link: "/admin/panelists",
          icon: <Cat className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Participants",
          link: "/admin/participants",
          icon: <User className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Sponsors",
          link: "/admin/sponsors",
          icon: <HandCoins className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Teams",
          link: "/admin/teams",
          icon: <Users className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Volunteers",
          link: "/admin/volunteers",
          icon: <Heart className={iconStyle} />,
          newTab: false,
        },
      ],
    },
    Services: {
      expand: true,
      tabs: [
        {
          name: "Calendar",
          link: "/admin/calendar",
          icon: <Calendar className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Contacts",
          link: "/admin/contacts",
          icon: <Mail className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Checkin",
          link: "/admin/checkin",
          icon: <QrCode className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Judging",
          link: "/admin/judging",
          icon: <MonitorCog className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Statistics",
          link: "/admin/statistics",
          icon: <BarChart className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Settings",
          link: "/admin/settings",
          icon: <Settings className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Timer",
          link: "/admin/timer",
          icon: <Timer className={iconStyle} />,
          newTab: false,
        },
      ],
    },
    Links: {
      expand: true,
      tabs: [
        {
          name: "Feedback",
          link: "/form/feedback",
          icon: <Search className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Devpost",
          link: data.devpost,
          icon: <Code className={iconStyle} />,
          newTab: true,
        },
        {
          name: "Website",
          link: "/",
          icon: <Globe className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Instagram",
          link: data.instagram,
          icon: <SiInstagram className={iconStyle} />,
          newTab: true,
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
          newTab: false,
        },
        {
          name: "Checkin",
          link: "/user/checkin",
          icon: <QrCode className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Schedule",
          link: "/user/schedule",
          icon: <Calendar className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Team",
          link: "/user/team",
          icon: <Users className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Resources",
          link: "/user/resources",
          icon: <Newspaper className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Find a Team",
          link: "/user/find",
          icon: <Search className={iconStyle} />,
          newTab: false,
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
          newTab: false,
        },
        {
          name: "Feedback",
          link: "/form/feedback",
          icon: <FileSearch className={iconStyle} />,
          newTab: false,
        },
      ],
    },
    Links: {
      expand: true,
      tabs: [
        {
          name: "Devpost",
          link: data.devpost,
          icon: <Code className={iconStyle} />,
          newTab: true,
        },
        {
          name: "Website",
          link: "/",
          icon: <Globe className={iconStyle} />,
          newTab: false,
        },
        {
          name: "Instagram",
          link: data.instagram,
          icon: <SiInstagram className={iconStyle} />,
          newTab: true,
        },
      ],
    },
  },
};
