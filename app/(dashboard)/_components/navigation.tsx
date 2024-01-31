"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-5xl space-x-5 p-5">
      <Link
        href={"/"}
        className={cn(pathname === "/" ? "underline underline-offset-1" : "")}
      >
        RYB
      </Link>
      <Link
        href={"/cmyk"}
        className={cn(
          pathname === "/cmyk" ? "underline underline-offset-1" : "",
        )}
      >
        CMYK
      </Link>
    </div>
  );
};

export default Navigation;
