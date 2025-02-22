import { Skeleton } from "@/components/ui/skeleton";

export default function UpdateSkeleton() {
  return (
    <section className="section items-center">
      <div className="flex w-full md:9/12 md:w-[700px] py-40 px-5 flex-col items-center pb-10">
        <div className="rounded-b-none rounded-md border dark:border-white/10 p-10 flex-col flex w-full">
          <div className="flex w-full">
            <Skeleton className="h-8 w-full rounded-md" />
          </div>
          <Skeleton className="w-full h-[100px] mt-10 rounded-md" />
        </div>
        <div className="py-3 dark:text-white/70 rounded-b-md border px-10 w-full md:9/12 md:w-[660px] border-t-0 dark:border-white/10">
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </section>
  );
}
