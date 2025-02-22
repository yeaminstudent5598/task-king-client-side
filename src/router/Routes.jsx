import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "@/pages/Home/Home";
import Update from "@/pages/Tasks/update/Update";
import Privateroutes from "./Private.routes";
import UpdateSkeleton from "@/pages/Tasks/update/Skeleton";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardSkeleton from "@/pages/Dashboard/DashboardSkeleton";
import NotFound404 from "@/pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
      {
        path: "/tasks/update/:id",
        element: (
          <Privateroutes loader={<UpdateSkeleton />}>
            <Update />
          </Privateroutes>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <Privateroutes loader={<DashboardSkeleton />}>
            <Dashboard />
          </Privateroutes>
        ),
      },
    ],
  },
]);
