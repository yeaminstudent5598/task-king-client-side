import { AuthContext } from "@/context/AuthContext";
import { auth } from "/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ArrowRight, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "@/hooks/axiosSecure";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enqueueSnackbar } from "notistack";

export default function TaskAdd() {
  const [taskTitle, settaskTitle] = useState();
  const [sigining, setsigining] = useState(false);
  const [category, setcategory] = useState();
  const { user } = useContext(AuthContext);

  const GoogleProvider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const handelNewTask = async (uid) => {
    try {
      if (!taskTitle) {
        setsigining(false);
        return enqueueSnackbar("Type task title", {
          variant: "error",
          autoHideDuration: 1500,
        });
      }

      if (!category) {
        setsigining(false);
        return enqueueSnackbar("Please select a category", {
          variant: "error",
          autoHideDuration: 1500,
        });
      }

      const payload = {
        title: taskTitle,
        category: category,
        uid: uid || user?.uid,
      };

      setsigining(true);

      const { data } = await axiosSecure.post(
        `/task/new?uid=${uid || user?.uid}`,
        payload
      );

      if (!data?._doc) {
        setsigining(false);
        return enqueueSnackbar("Something went wrong", {
          variant: "error",
        });
      }

      navigate(`/tasks/update/${data?._doc?._id}`);
      settaskTitle(null);
      setcategory(null);
    } catch (error) {
      enqueueSnackbar("Failed to create task", {
        variant: "error",
      });
      console.error("Error creating task:", error);
    } finally {
      setsigining(false);
    }
  };

  const SignIinWithGoogle = async () => {
    if (sigining) {
      return;
    }

    if (!taskTitle) {
      setsigining(false);
      return enqueueSnackbar("Type task title", {
        variant: "error",
        autoHideDuration: 1500,
      });
    }

    if (!category) {
      setsigining(false);
      return enqueueSnackbar("Please select a category", {
        variant: "error",
        autoHideDuration: 1500,
      });
    }
    setsigining(true);

    signInWithPopup(auth, GoogleProvider)
      .then(async (res) => {
        enqueueSnackbar("Authentication succesfull");
        setsigining(false);
      })
      .catch((err) => {
        enqueueSnackbar("Somethign went wrong", { variant: "error" });
        setsigining(false);
      });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        transition={{
          delay: 0.5,
        }}
        whileInView={{
          opacity: 1,
        }}
        className="w-full mt-5 sm:w-12/12 md:w-[600px] backdrop-blur-2xl z-40 overflow-hidden border border-black/20 dark:border-[#FFFFFF1a] items-center flex flex-col rounded-md"
      >
        <motion.span
          initial={{ width: 0 }}
          transition={{
            delay: 0.7,
          }}
          whileInView={{
            width: "60%",
          }}
          className="flex h-[1px] bg-radial shadow-sky-600 from-sky-600 dark:from-sky-800 to-white dark:to-black/20"
        />
        <div className="p-5 text-sm flex flex-col items-start w-full font-light text-white/70 text-start">
          <div className="flex w-full justify-between">
            <input
              disabled={sigining}
              onChange={(e) => settaskTitle(e.target.value)}
              value={taskTitle}
              maxLength={50}
              className="flex-grow placeholder:text-black/80 pb-5 text-black dark:placeholder:text-white/70 dark:text-white dark:placeholder:font-light placeholder:font-normal"
              placeholder="Type your task title here"
            />
          </div>
          <div className="flex justify-between text-black dark:text-white/30 w-full">
            <div className="flex items-center justify-center gap-3">
              <AnimatePresence>
                {taskTitle?.length >= 1 ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex mt-5 text-sm"
                  >
                    Max {taskTitle?.length} - 50
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex mt-5  text-sm"
                  >
                    Max 50
                  </motion.span>
                )}
              </AnimatePresence>
              <Select
                disabled={sigining}
                value={category}
                onValueChange={setcategory}
              >
                <SelectTrigger className="w-[100px] shadow-none dark:text-white/70 mt-5 h-fit border-0 !p-0">
                  <SelectValue placeholder="Category" className="!p-0" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="to-do">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <AnimatePresence>
              {taskTitle?.length >= 1 && (
                <motion.button
                  disabled={sigining}
                  onClick={() => {
                    user ? handelNewTask() : SignIinWithGoogle();
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-gradient-to-br from-sky-800 text-white to-sky-500 rounded-md p-2"
                >
                  {sigining ? (
                    <Loader2 strokeWidth={2} className="animate-spin" />
                  ) : (
                    <ArrowRight strokeWidth={2} />
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}
