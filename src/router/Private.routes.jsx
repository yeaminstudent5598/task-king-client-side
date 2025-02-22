import { AuthContext } from "@/context/AuthContext";
import { enqueueSnackbar } from "notistack";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function Privateroutes({ loader, children }) {
  const { user, userValiding } = useContext(AuthContext);

  if (userValiding) {
    return loader || "Loading";
  }
  if (!user) {
    enqueueSnackbar("Please signin first");
    return <Navigate to={"/"} />;
  }
  return children;
}
