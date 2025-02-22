import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import Logo from "./ui/Logo";
import { Loader2, Star } from "lucide-react";
import { useContext, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { AuthContext } from "../context/AuthContext";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import DarkMode from "./ui/DarkMode";

export default function Header() {
  const { user, userValiding } = useContext(AuthContext);

  return (
    <>
      <header className="section">
        <div className="w-full flex justify-between items-center min-h-20 py-5 px-5">
          <Logo width={110} />
          <div className="flex items-center gap-3">
            <DarkMode />
            <GithubStar />
            <div>
              {userValiding ? (
                <Skeleton className={`w-9 h-9 rounded-full`} />
              ) : !user ? (
                <GoogleSignIn />
              ) : (
                <>
                  <Popover>
                    <PopoverTrigger>
                      <Avatar className="ring-4 ring-sky-600/20 scale-75">
                        <AvatarFallback>
                          {user?.displayName?.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                        <AvatarImage
                          src={user?.photoURL}
                          alt={user?.displayName}
                        />
                      </Avatar>
                    </PopoverTrigger>
                    <PopoverContent className="w-[150px] dark:!text-white/70 text-sm !text-start flex p-[2px] flex-col mt-2 mr-5">
                      <Link
                        to={`./dashboard`}
                        className="w-full py-1 px-3 hover:bg-white/10 rounded-[3px]"
                      >
                        Dashboard
                      </Link>
                      <span className="w-full my-[1px] h-[1px] flex bg-white/10"></span>
                      <Link
                        to={`./profile`}
                        className="w-full py-1 px-3 hover:bg-white/10 rounded-[3px]"
                      >
                        Profile
                      </Link>
                      <span className="w-full my-[1px] h-[1px] flex bg-white/10"></span>
                      <button
                        onClick={() => {
                          signOut(auth);
                        }}
                        className="w-full text-start py-1 px-3 hover:bg-white/10 rounded-[3px]"
                      >
                        Logout
                      </button>
                    </PopoverContent>
                  </Popover>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export const GoogleSignIn = () => {
  const [sigining, setsigining] = useState(false);

  const GoogleProvider = new GoogleAuthProvider();

  const SignIinWithGoogle = async () => {
    if (sigining) {
      return;
    }
    setsigining(true);

    signInWithPopup(auth, GoogleProvider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        {
          console.error(err);
        }
      })
      .finally(() => {
        setsigining(false);
      });
  };

  return (
    <>
      <Button
        disabled={sigining}
        onClick={SignIinWithGoogle}
        className={`w-full gap-2 flex justify-center ${
          sigining && "cursor-not-allowed opacity-80"
        }`}
      >
        {sigining ? (
          <>
            <Loader2 size={20} className="animate-spin duration-[7000]" />{" "}
          </>
        ) : (
          <>Signin</>
        )}
      </Button>
    </>
  );
};

export const GithubStar = () => {
  return (
    <>
      <Link
        target="_blank"
        to={import.meta.env.VITE_GITHUB_PROFILE}
        className="font-light max-[430px]:hidden bg-black/80 text-white dark:text-white/70 text-sm dark:hover:bg-neutral-100/20 dark:bg-neutral-100/10 px-5 py-1 rounded-md border dark:border-white/5  flex gap-2 items-center"
      >
        <span className="">Give a star</span>
      </Link>
    </>
  );
};
