import {
  ArrowLeft,
  Check,
  ImagePlus,
  Paperclip,
  RefreshCcw,
} from "lucide-react";
import { useState, useRef, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosSecure } from "@/hooks/axiosSecure";
import { AuthContext } from "@/context/AuthContext";
import NotFound404 from "@/pages/404";
import UpdateSkeleton from "./Skeleton";
import { Button } from "@/components/ui/Button";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import moment from "moment";

export default function Update() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [taskData, settaskData] = useState();
  const localStorageTask = JSON.parse(localStorage.getItem(`task-${id}`)) || {};
  const [title, setTitle] = useState(localStorageTask.title || "Untitled task");
  const [description, setDescription] = useState(
    localStorageTask.description || ""
  );
  const [saving, setSaving] = useState(false);

  const desRef = useRef();
  const { user } = useContext(AuthContext);
  const updateTimeout = useRef(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/task/get/${id}?uid=${user?.uid}`
        );
        if (!data?._id) {
          setError(true);
          return;
        }
        setTitle(data.title || "Untitled task");
        setDescription(data.description || "");
        settaskData(data);
        updateTask();
      } catch (error) {
        setError(true);
        const cachedTask = localStorage.getItem(`task-${id}`);
        settaskData(cachedTask);
        if (cachedTask) {
          const { title, description } = JSON.parse(cachedTask);
          setTitle(title);
          setDescription(description);
        }
      } finally {
        setIsLoading(false);
      }
    };
    desRef?.current?.focus();
    if (user) {
      fetchTask();
    }
  }, [id, user]);

  const updateTask = async () => {
    if (!title.trim() || !description.trim()) return;
    setSaving(true);

    const updatedTask = {
      title,
      description,
      updatedAt: taskData?.updatedAt,
      createdAt: taskData?.createdAt,
    };
    localStorage.setItem(`task-${id}`, JSON.stringify(updatedTask));

    try {
      await axiosSecure.put(`/task/update/${id}?uid=${user?.uid}`, updatedTask);
    } catch (error) {
      console.error("Failed to update on server, saved locally.");
    }

    setSaving(false);
  };

  useEffect(() => {
    if (updateTimeout.current) clearTimeout(updateTimeout.current);
    updateTimeout.current = setTimeout(() => {
      updateTask();
    }, 500);
    return () => clearTimeout(updateTimeout.current);
  }, [title, description]);

  if (error) {
    return <NotFound404 />;
  }

  if (isLoading) {
    return <UpdateSkeleton />;
  }

  return (
    <>
      <div className="px-5 pt-10">
        <Link to={-1}>
          <button className="group flex items-center gap-3">
            <ArrowLeft
              className="translate-x-2 transition-all group-hover:translate-x-0"
              size={20}
            />{" "}
            Go Back
          </button>
        </Link>
      </div>
      <section className="section items-center">
        <div className="flex w-full md:9/12 md:w-[700px] py-40 pt-20 px-5 flex-col items-center pb-10">
          <div className="rounded-b-none rounded-md border backdrop-blur-xl z-30 dark:border-white/10 p-10 flex-col flex w-full">
            <div className="flex w-full">
              <input
                maxLength={50}
                className="text-2xl w-full overflow-auto focus-within:ring-1 -ml-2 px-2 py-1 dark:ring-white/40 rounded-md"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <textarea
              ref={desRef}
              maxLength={200}
              placeholder="Write your tasks"
              className="w-full text-sm [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-track]:rounded-full resize-none min-h-[100px] dark:text-white/70 h-full mt-5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="pt-5 flex justify-between w-full -mb-5 items-center">
              <button className="hover:bg-white/10 transition-all p-2 rounded-md group">
                <Paperclip
                  className="group-hover:rotate-90 transition-all"
                  size={24}
                  strokeWidth={1}
                />
              </button>
              <span className="text-sm text-white/50 ">
                Max {description?.length} - 200
              </span>
            </div>
          </div>
          <div className="py-3 flex-wrap gap-y-2 flex justify-between  dark:text-white/70 backdrop-blur-xl z-50 rounded-b-md border px-10 w-full md:9/12 md:w-[660px] border-t-0 dark:border-white/10">
            <span className="flex items-center gap-2 font-light text-sm">
              {saving ? (
                <RefreshCcw
                  className="animate-spin"
                  size={18}
                  strokeWidth={1}
                />
              ) : (
                <Check size={18} strokeWidth={1} />
              )}
              {saving ? "saving..." : "saved"}
            </span>
            <div className="flex items-center gap-x-3 gap-y-2 flex-wrap">
              <span className="flex items-center gap-2 font-light text-sm">
                Last update {moment(taskData?.updatedAt).fromNow()}
              </span>
              <span className="flex items-center gap-2 font-light text-sm">
                Created At {moment(taskData?.createdAt).fromNow()}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
