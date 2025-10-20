import { Outlet } from "react-router";
import { Header } from "~/components/header";
import { cn } from "~/lib/utils";

export default function Layout() {
  return (
    <div className="overflow-x-hidden">
      <Header />

      <div className={cn("overflow-hidden px-[50px]")}>
        <Outlet />
      </div>
    </div>
  );
}