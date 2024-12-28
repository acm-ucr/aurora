import {
  SiJavascript as Javascript,
  SiArduino as Arduino,
  SiNextdotjs as Nextjs,
  SiTailwindcss as Tailwind,
  SiFirebase as Firebase,
  SiCplusplus as CPlusPlus,
  SiMongodb as Mongodb,
  SiPython as Python,
  SiUnity as Unity,
  SiGithubactions as GithubActions,
  SiEslint as Eslint,
  SiPrettier as Prettier,
  SiDiscord as Discord,
  SiJupyter as Jupyter,
  SiPandas as Pandas,
} from "@icons-pack/react-simple-icons";

export const TECHSTACKS: Record<string, React.ReactNode> = {
  Javascript: <Javascript className="w-4" />,
  "Next.js": <Nextjs className="w-4" />,
  Firebase: <Firebase className="w-4" />,
  Tailwind: <Tailwind className="w-4" />,
  MongoDB: <Mongodb className="w-4" />,
  Arduino: <Arduino className="w-4" />,
  Python: <Python className="w-4" />,
  Unity: <Unity className="w-4" />,
  "C++": <CPlusPlus className="w-4" />,
  "Github Actions": <GithubActions className="w-4" />,
  Eslint: <Eslint className="w-4" />,
  Prettier: <Prettier className="w-4" />,
  Discord: <Discord className="w-4" />,
  Jupyter: <Jupyter className="w-4" />,
  Pandas: <Pandas className="w-4" />,
};
export const HACKPACKS = [
  {
    link: "https://github.com/acm-ucr/firebase-nextjs-hackpack",
    title: "Firebase Web App",
    languages: [
      "Javascript",
      "Next.js",
      "Firebase",
      "Tailwind",
      "Prettier",
      "Eslint",
      "Github Actions",
    ],
    description:
      "A full-stack starter using Firebase and Next.js. Ideal for apps with real-time database needs, featuring Tailwind CSS and GitHub Actions.",
  },
  {
    link: "https://github.com/acm-ucr/firebase-nextjs-hackpack",
    title: "MongoDB Web App",
    languages: [
      "Javascript",
      "Next.js",
      "MongoDB",
      "Tailwind",
      "Prettier",
      "Eslint",
      "Github Actions",
    ],
    description:
      "A Next.js + MongoDB pack for scalable, document-based apps. Great for flexible data management with Tailwind styling.",
  },
  {
    link: "https://github.com/acm-ucr/nextjs-hackpack",
    title: "Full Stack Web App",
    languages: [
      "Javascript",
      "Next.js",
      "Tailwind",
      "Prettier",
      "Eslint",
      "Github Actions",
    ],
    description:
      "Next.js starter for single-page apps with Tailwind CSS. Fast setup with built-in GitHub Actions for CI/CD.",
  },
  {
    link: "https://github.com/acm-ucr/arduino-hackpack",
    title: "Hardware",
    languages: ["Arduino", "C++"],
    description:
      "A starter for Arduino projects. Perfect for IoT, robotics, and hands-on hardware experiments with C++.",
  },
  {
    link: "https://github.com/acm-ucr/unity-hackpack",
    title: "Game Development",
    languages: ["Unity"],
    description:
      "Unity starter pack for 2D and 3D games. Includes foundational scripts for quick game prototyping.",
  },
  {
    link: "https://github.com/acm-ucr/discord-javascript-hackpack",
    title: "Javascript Discord Bot",
    languages: [
      "Javascript",
      "Discord",
      "Prettier",
      "Eslint",
      "Github Actions",
    ],
    description:
      "JavaScript starter for Discord bots, with templates for commands and events. Great for chat automation and community tools.",
  },
  {
    link: "https://github.com/acm-ucr/discord-python-hackpack",
    title: "Python Discord Bot",
    languages: ["Python"],
    description:
      "Python-based starter for Discord bots. Ideal for chat management and interactive bot functionalities.",
  },
  {
    link: "https://github.com/acm-ucr/discord-python-hackpack",
    title: "Computer Vision",
    languages: ["Python"],
    description:
      "Python starter pack for computer vision. Suitable for image processing and object detection projects.",
  },
  {
    link: "https://github.com/acm-ucr/python-hackpack",
    title: "Python",
    languages: ["Python"],
    description:
      "A general-purpose Python starter, useful for scripting, automation, and data analysis projects.",
  },
  {
    link: "https://github.com/acm-ucr/python-hackpack",
    title: "Machine Learning",
    languages: ["Python", "Jupyter", "Pandas"],
    description:
      "Python + Jupyter starter for machine learning. Perfect for data analysis and predictive modeling with Pandas.",
  },
];
