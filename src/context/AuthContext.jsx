import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.config";
import { axiosSecure } from "@/hooks/axiosSecure";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userValiding, setuserValiding] = useState(true);
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "dark"
  );

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid } = user;
        const res = await axiosSecure.post(`/auth/token/new`, {
          ...user,
        });
        setUser(user);
      } else {
        setUser(null);
        signOut(auth);
      }
      setuserValiding(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, userValiding, setuserValiding, setUser, mode, setMode }}
    >
      {children}
    </AuthContext.Provider>
  );
};
