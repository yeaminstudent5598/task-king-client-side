import TaskAdd from "@/components/TaskAdd";
import Br from "@/components/ui/Br";
import { Cover } from "@/components/ui/cover";
import { MarkLink } from "@/components/ui/MarkLink";
import { motion } from "motion/react";

export default function Home() {
  return (
    <>
      <section className={`section bg-repeat bg-contain`}>
        <div className="wraper items-center py-40 justify-center px-5">
          <div className="space-y-5 flex flex-col items-center">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
              }}
              className="text-center gap-3 flex flex-col items-center"
            >
              <h1 className="text-3xl leading-7 md:leading-10 sm:text-4xl md:text-5xl capitalize font-semibold">
                Add you tasks enhance <Br /> your <Cover>Productivity</Cover>
              </h1>
              <p className="text-sm md:text-base font-light dark:text-white/70">
                Taski a free task management system poweredby MERN Stack <Br />{" "}
                <strong>Author</strong>{" "}
                <MarkLink to={"/"}>Yeamin Madbor</MarkLink>
              </p>
            </motion.div>
            <TaskAdd />
          </div>
        </div>
      </section>
    </>
  );
}
