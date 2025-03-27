"use client";

import LOGO from "@/app/favicon.ico";
import Image from "next/image";
import Link from "next/link";
import { TABS } from "@/data/navigation";
import { usePathname } from "next/navigation";
import data from "@/data/config";
import { LogIn, ChevronDown, SquareArrowOutUpRight } from "lucide-react";
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const Navigation = () => {
  const pathname = usePathname();

  const tabs = TABS[pathname.split("/")[1]];
  const { open, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="text-white">
      <SidebarHeader className={`${open ? "py-8" : "py-4"}`}>
        <Image
          src={LOGO}
          className="mx-auto h-12 w-12"
          alt={`${data.name} Logo`}
        />
      </SidebarHeader>
      <SidebarContent>
        {Object.entries(tabs).map(([title, subTabs], index) => (
          <Collapsible
            key={index}
            defaultOpen
            className="group/collapsible pt-0"
          >
            <SidebarGroup className="pt-0">
              {open && (
                <SidebarGroupLabel asChild className="pt-0 text-xl font-bold">
                  <CollapsibleTrigger className="text-white">
                    {title}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
              )}
              <CollapsibleContent className="overflow-hidden transition-transform data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {subTabs.tabs &&
                      subTabs.tabs.map(
                        ({ name, icon, link, target }, index) => (
                          <Link key={index} href={link} target={target}>
                            <SidebarMenuItem
                              key={index}
                              className={`flex h-6 items-center pl-3 text-lg ${link === pathname && "bg-hackathon-blue-100"} rounded`}
                            >
                              <span className={`${!open && "mx-auto"}`}>
                                {icon}
                              </span>
                              {open && (
                                <span className="ml-2 mr-1 flex items-center">
                                  {name}
                                  {target === "_blank" && (
                                    <SquareArrowOutUpRight className="ml-1 mt-1 h-4 w-4" />
                                  )}
                                </span>
                              )}
                            </SidebarMenuItem>
                          </Link>
                        ),
                      )}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>
      <SidebarFooter className="my-1 flex flex-col p-0 pb-2 pl-1">
        <span
          onClick={() => toggleSidebar()}
          className={`${open ? "h-7 pl-3" : "mx-auto h-6"} flex items-center text-lg hover:cursor-pointer`}
        >
          <span className={`${!open && "mx-auto"}`}>
            <SidebarTrigger className="hover:bg-inherit hover:text-current" />
          </span>
          {open && <span className="ml-2">Close Sidebar</span>}
        </span>
        <span
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className={`${open ? "h-7 pl-3" : "mx-auto h-6"} flex items-center text-lg hover:cursor-pointer`}
        >
          <span className={`${!open && "mx-auto"}`}>
            <LogIn className="mr-1 h-7 p-0.5" />
          </span>
          {open && <span className="ml-2">Log Out</span>}
        </span>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navigation;
