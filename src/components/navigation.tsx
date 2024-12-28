"use client";

import LOGO from "@/app/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import { TABS } from "@/data/navigation";
import { usePathname } from "next/navigation";
import data from "@/data/config";
import { LogIn, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const Navigation = () => {
  const pathName = usePathname();

  const tabs = TABS[pathName.split("/")[1]];

  return (
    <Sidebar className="text-white">
      <SidebarHeader className="py-8">
        <Image
          src={LOGO}
          className="mx-auto h-12 w-12"
          alt={`${data.name} Logo`}
        />
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(tabs).map(([title, subTabs], index) => (
          <Collapsible key={index} defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild className="text-xl font-bold">
                <CollapsibleTrigger>
                  {title}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent className="pt-3">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {subTabs.tabs &&
                      subTabs.tabs.map((tab, index) => (
                        <Link key={index} href={tab.link}>
                          <SidebarMenuItem
                            key={index}
                            className="flex items-center pl-3 text-lg"
                          >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.name}
                          </SidebarMenuItem>
                        </Link>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter className="mx-auto mb-1 grid grid-cols-4 *:mx-2">
        <LogIn onClick={() => signOut({ callbackUrl: "/", redirect: true })} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navigation;
