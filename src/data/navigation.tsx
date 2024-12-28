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
} from "lucide-react";
import data from "./config";
import { SiInstagram } from "@icons-pack/react-simple-icons";

const iconStyle = "mr-2 w-4 h-4";

interface Tab {
  name: string;
  link: string;
  icon: JSX.Element;
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
          name: "Participants",
          link: "/admin/participants",
          icon: <User className={iconStyle} />,
        },
        {
          name: "Teams",
          link: "/admin/teams",
          icon: <Users className={iconStyle} />,
        },
        {
          name: "Judges",
          link: "/admin/judges",
          icon: <Gavel className={iconStyle} />,
        },
        {
          name: "Volunteers",
          link: "/admin/volunteers",
          icon: <Heart className={iconStyle} />,
        },
        {
          name: "Mentors",
          link: "/admin/mentors",
          icon: <HandHeart className={iconStyle} />,
        },
        {
          name: "Admin",
          link: "/admin/admins",
          icon: <Lock className={iconStyle} />,
        },
        {
          name: "Committees",
          link: "/admin/committees",
          icon: <Handshake className={iconStyle} />,
        },
        {
          name: "Sponsors",
          link: "/admin/sponsors",
          icon: <Users className={iconStyle} />,
        },
        {
          name: "Panelists",
          link: "/admin/panelists",
          icon: <Users className={iconStyle} />,
        },
        {
          name: "Interests",
          link: "/admin/interests",
          icon: <AlertCircle className={iconStyle} />,
        },
        {
          name: "Feedback",
          link: "/admin/feedback",
          icon: <MessagesSquare className={iconStyle} />,
        },
        {
          name: "Leads",
          link: "/admin/leads",
          icon: <Hand className={iconStyle} />,
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
        },
        {
          name: "Contacts",
          link: "/admin/contacts",
          icon: <Mail className={iconStyle} />,
        },
        {
          name: "Checkin",
          link: "/admin/checkin",
          icon: <QrCode className={iconStyle} />,
        },
        {
          name: "Judging",
          link: "/admin/judging",
          icon: <MonitorCog className={iconStyle} />,
        },
        {
          name: "Statistics",
          link: "/admin/statistics",
          icon: <BarChart className={iconStyle} />,
        },
        {
          name: "Settings",
          link: "/admin/settings",
          icon: <Settings className={iconStyle} />,
        },
        {
          name: "Timer",
          link: "/admin/timer",
          icon: <Timer className={iconStyle} />,
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
        },
        {
          name: "Devpost",
          link: data.devpost,
          icon: <Code className={iconStyle} />,
        },
        {
          name: "Website",
          link: "/",
          icon: <Globe className={iconStyle} />,
        },
        {
          name: "Instagram",
          link: data.instagram,
          icon: <SiInstagram className={iconStyle} />,
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
        },
        {
          name: "Checkin",
          link: "/user/checkin",
          icon: <QrCode className={iconStyle} />,
        },
        {
          name: "Schedule",
          link: "/user/schedule",
          icon: <Calendar className={iconStyle} />,
        },
        {
          name: "Team",
          link: "/user/team",
          icon: <Users className={iconStyle} />,
        },
        {
          name: "Resources",
          link: "/user/resources",
          icon: <Newspaper className={iconStyle} />,
        },
        {
          name: "Find a Team",
          link: "/user/find",
          icon: <Search className={iconStyle} />,
        },
      ],
    },
    Forms: {
      expand: true,
      tabs: [
        {
          name: "Post Team Idea",
          link: "/form/idea",
          icon: <Search className={iconStyle} />,
        },
        {
          name: "Feedback",
          link: "/form/feedback",
          icon: <Search className={iconStyle} />,
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
        },
        {
          name: "Website",
          link: "/",
          icon: <Globe className={iconStyle} />,
        },
        {
          name: "Instagram",
          link: data.instagram,
          icon: <SiInstagram className={iconStyle} />,
        },
      ],
    },
  },
};
