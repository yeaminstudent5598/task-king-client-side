import { Link } from "react-router-dom";
import NotFoundImage from "../../public/notfound.svg";
import { MarkLink } from "@/components/ui/MarkLink";
import { ChevronRight } from "lucide-react";

export default function NotFound404() {
  return (
    <>
      <section className="section">
        <div className="wraper h-screen flex-col gap-5 items-center justify-center">
          <img width={300} src={NotFoundImage} alt="Not Found" />
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-semibold">Sorry Page Not Found</h2>
            <p className="text-white/70">
              Sorry we can{"'"}t found this page please go back or contact with
              us
            </p>
          </div>
          <MarkLink className="flex items-center underline" to={-1}>
            Go back <ChevronRight color="white" strokeWidth={1} size={20} />
          </MarkLink>
        </div>
      </section>
    </>
  );
}
