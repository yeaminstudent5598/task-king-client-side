import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  const COLUMN_NAMES = {
    "to-do": "To Do 📝",
    "in-progress": "In Progress 🎯",
    done: "Done ✅",
  };

  return (
    <>
      <section className="section">
        <div className="w-full py-20 px-5">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 p-5 w-full h-full">
            {Object.keys(COLUMN_NAMES).map((columnKey) => (
              <div
                key={columnKey}
                className="border border-black/[0.2] h-full dark:border-white/[0.2] flex group overflow-hidden relative p-10"
              >
                <div className="relative z-50 w-full">
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
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
