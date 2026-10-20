import type { Metadata } from "next";
import TopNavbar from "@/components/layout/TopNavbar";
import SideNavbar from "@/components/layout/SideNavbar";

export const metadata: Metadata = {
  title: "RouteShield",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <TopNavbar />
      <div className="mx-auto flex w-full max-w-6xl flex-1">
        <SideNavbar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}