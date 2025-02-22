"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { axiosSecure } from "@/hooks/axiosSecure";
import { useQuery } from "@tanstack/react-query";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom";
import { Clock7, EllipsisVertical, Plus, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Button } from "@/components/ui/Button";
import moment from "moment";
import TaskAdd from "@/components/TaskAdd";
import Overlay from "@/components/ui/Overlay";

const COLUMN_NAMES = {
  "to-do": "To Do 📝",
  "in-progress": "In Progress 🎯",
  done: "Done ✅",
};

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [createModalOpen, setcreateModalOpen] = useState();
  const [updatedTasks, setUpdatedTasks] = useState([]);

  useEffect(() => {
    const updateTasks = async () => {
      const res = await axiosSecure.put(
        `/taks/update/many?uid=${user?.uid}`,
        updatedTasks
      );
      refetch();
    };
    updateTasks();
  }, [updatedTasks]);

  const fetchTasks = async () => {
    const { data } = await axiosSecure.get(`/tasks/all?uid=${user?.uid}`);
    setTasks(data);
    return data;
  };

  const { isLoading, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const columns = Object.keys(COLUMN_NAMES).reduce((acc, key) => {
    acc[key] = tasks
      .filter((task) => task.category === key)
      .sort((a, b) => a.index - b.index);
    return acc;
  }, {});

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCategory = source.droppableId;
    const destinationCategory = destination.droppableId;

    let updatedTasksArray = [...tasks];
    let updatedTasksList = [...updatedTasks];

    if (sourceCategory === destinationCategory) {
      const updatedTasks = [...columns[sourceCategory]];
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      updatedTasks.forEach((task, index) => (task.index = index));

      updatedTasksArray = updatedTasksArray.map(
        (task) => updatedTasks.find((t) => t._id === task._id) || task
      );
      updatedTasksList = updatedTasks.map((task) => ({
        id: task._id,
        category: destinationCategory,
        index: task.index,
      }));
    } else {
      const sourceTasks = [...columns[sourceCategory]];
      const destinationTasks = [...columns[destinationCategory]];

      const [movedTask] = sourceTasks.splice(source.index, 1);
      movedTask.category = destinationCategory;
      destinationTasks.splice(destination.index, 0, movedTask);

      sourceTasks.forEach((task, index) => (task.index = index));
      destinationTasks.forEach((task, index) => (task.index = index));

      updatedTasksArray = updatedTasksArray.map((task) =>
        task._id === movedTask._id ? { ...movedTask } : task
      );

      updatedTasksList = [
        ...sourceTasks.map((task) => ({
          id: task._id,
          category: sourceCategory,
          index: task.index,
        })),
        ...destinationTasks.map((task) => ({
          id: task._id,
          category: destinationCategory,
          index: task.index,
        })),
      ];
    }

    setTasks(updatedTasksArray);
    setUpdatedTasks(updatedTasksList);
  };

  const HandelDelete = async (taskID) => {
    const promise = new Promise((resolve, reject) => {
      const action = (snackbarId) => (
        <>
          <button
            className="px-2 py-1 rounded-sm text-black bg-white border-white text-sm"
            onClick={() => {
              resolve(true);
              closeSnackbar(snackbarId);
            }}
          >
            Delete
          </button>
          <button
            className="px-2 py-1 rounded-md text-white bg-black border-black ml-2 text-sm"
            onClick={() => {
              reject(false);
              closeSnackbar(snackbarId);
            }}
          >
            Cancel
          </button>
        </>
      );

      enqueueSnackbar("Are you sure you want to delete?", {
        variant: "warning",
        persist: true,
        action,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    });

    promise
      .then(() => {
        axiosSecure
          .delete(`/tasks/delete?uid=${user?.uid}&id=${taskID}`)
          .then((res) => {
            refetch();
          });
      })
      .catch(() => {
        console.log("❌ Action canceled by the user.");
      });
  };

  if (isLoading) {
    return (
      <>
        <section className="section">
          <div className="w-full py-20 px-5">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 p-5 w-full h-full">
              <DragDropContext onDragEnd={() => {}}>
                {Object.keys(COLUMN_NAMES).map((columnKey) => (
                  <Droppable key={columnKey} droppableId={columnKey}>
                    {(provided) => (
                      <div
                        className="border border-black/[0.2] h-full dark:border-white/[0.2] flex group overflow-hidden relative p-10"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div className="relative z-50 w-full">
                          <h2 className="text-2xl font-bold mb-2">
                            {COLUMN_NAMES[columnKey]}
                          </h2>
                          <div className="pt-5 flex flex-col w-full">
                            {[...Array(5)].map((_, index) => (
                              <div key={index} className="mb-3">
                                <div className="flex items-center space-x-3">
                                  <Skeleton className="h-5 w-2/4" />
                                </div>
                                <Skeleton className="h-3 w-full mt-2" />
                                <Skeleton className="h-3 w-3/4 mt-2" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </DragDropContext>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="section">
        <div className="w-full py-20 px-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 p-5 w-full h-full">
            <DragDropContext onDragEnd={onDragEnd}>
              {Object.keys(COLUMN_NAMES).map((columnKey) => (
                <Droppable key={columnKey} droppableId={columnKey}>
                  {(provided) => (
                    <div
                      className="border border-black/[0.2] h-full dark:border-white/[0.2] flex group overflow-hidden relative p-10"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {" "}
                      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
                      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
                      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
                      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
                      <div className="relative z-50 w-full">
                        <h2 className="text-2xl font-bold mb-2">
                          {COLUMN_NAMES[columnKey]}
                        </h2>
                        <div className="pt-5 flex flex-col w-full">
                          {columns[columnKey].map((task, index) => (
                            <Draggable
                              key={task._id}
                              draggableId={task._id}
                              index={index}
                            >
                              {(provided) => (
                                <div className="flex justify-end flex-col gap-0 items-end">
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="w-full flex mb-3 justify-between overflow-hidden p-5 hover:bg-white/10 transition-all cursor-pointer border-black/20 dark:border-white/10 space-y-1 rounded-md  backdrop-blur-2xl border"
                                  >
                                    <div className="">
                                      <Link
                                        to={`/tasks/update/${task?._id}`}
                                        className="hover:underline"
                                      >
                                        {task.title}
                                      </Link>
                                      <p className="text-sm mt-2  font-light dark:text-white/50">
                                        {task.description?.slice(0, 100)}
                                        {task?.description?.length > 100 &&
                                          "..."}
                                        <div className="flex items-center gap-2 pt-2">
                                          <Clock7 strokeWidth={1} size={18} />
                                          {moment(task?.createdAt).fromNow()}
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                          Category - {task?.category}
                                        </div>
                                      </p>
                                    </div>
                                    <Popover>
                                      <PopoverTrigger>
                                        <div className="p-2 flex-grow z-40 hover:bg-white/10 transition-all bg-white/5 rounded-md">
                                          <EllipsisVertical />
                                        </div>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        align="center"
                                        position="top"
                                        className="w-[100px] flex flex-col p-[2px]"
                                      >
                                        <Link
                                          to={`/tasks/update/${task?._id}`}
                                          className="w-full py-1 px-3 text-start hover:bg-white/10 rounded-[3px]"
                                        >
                                          Update
                                        </Link>
                                        <span className="w-full my-[1px] h-[1px] flex bg-white/10"></span>
                                        <button
                                          onClick={() =>
                                            HandelDelete(task?._id)
                                          }
                                          className="w-full py-1 px-3 text-start hover:bg-white/10 rounded-[3px]"
                                        >
                                          Delete
                                        </button>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          <button
                            onClick={() => setcreateModalOpen(true)}
                            className="w-full justify-center flex mb-3 items-center gap-5 overflow-hidden p-5 hover:bg-white/10 transition-all cursor-pointer border-black/20 dark:border-white/10 space-y-1 rounded-md  backdrop-blur-2xl border"
                          >
                            Create new task <Plus size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Droppable>
              ))}
            </DragDropContext>
          </div>
        </div>
      </section>
      {createModalOpen && (
        <>
          <div className="flex justify-center flex-col overflow-y-scroll [&::-webkit-scrollbar]:w-0 h-screen fixed top-0 z-50 items-center px-5 py-40 w-full bg-black">
            <Overlay />
            <div className="flex flex-col items-end">
              <button
                onClick={() => setcreateModalOpen(false)}
                className="bg-white/5 px-2 rounded-md py-2 border border-white/10"
              >
                <X />
              </button>
              <TaskAdd />
            </div>
          </div>
        </>
      )}
    </>
  );
}
