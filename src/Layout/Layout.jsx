import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <ScrollProgress />
    </>
  );
}
