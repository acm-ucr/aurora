"use client";
import { Session as SessionType } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider } from "./ui/sidebar";

type props = {
  children: React.ReactNode;
  session: SessionType | null;
};

const Providers = ({ children, session }: props) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {},
        },
      }),
  );

  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <QueryClientProvider client={client}>
        <SidebarProvider>{children}</SidebarProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
