import { AuthContext } from "@/context/AuthContext";
import { Moon, Sun } from "lucide-react";
import { useContext } from "react";

export default function DarkMode() {
  const { mode, setMode } = useContext(AuthContext);

  return (
    <button onClick={() => setMode(mode === "dark" ? "light" : "dark")}>
      {mode === "dark" ? (
        <Moon strokeWidth={0.75} />
      ) : (
        <Sun strokeWidth={0.75} />
      )}
    </button>
  );
}
