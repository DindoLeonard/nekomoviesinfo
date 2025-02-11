"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const search = formData.get("name") as string;

    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (search) {
      current.set("s", search);
      current.delete("page");
    } else {
      current.delete("s");
    }

    const query = search ? `?${current.toString()}` : "";

    router.push(`${pathname}${query}`);
  }

  return (
    <form
      className="lg:w-[50%] flex flex-col lg:flex-row lg:space-x-1"
      onSubmit={onFormSubmit}
    >
      <Input
        placeholder="search movie or tv-show"
        name="name"
        autoComplete="off"
        className="caret-white"
      />
      <Button type="submit" variant={"outline"}>
        Search
      </Button>
    </form>
  );
}

export function Pagination({ hasNextPage = false }: { hasNextPage: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <div className="flex space-x-3 w-full justify-center">
      <div
        className={cn(
          { hidden: (searchParams.get("page") as string) === "1" },
          "cursor-pointer"
        )}
        onClick={() => {
          const current = new URLSearchParams(
            Array.from(searchParams.entries())
          );
          const page = searchParams.get("page") as string;

          if (page === "1") return;

          current.set("page", (Number(page || 1) - 1).toString());

          const query = page ? `?${current.toString()}` : "";

          router.push(`${pathname}${query}`);
        }}
      >
        <p>{`<-Prev`}</p>
      </div>
      <div>{searchParams.get("page")}</div>
      <div
        className={cn({ hidden: !hasNextPage }, "cursor-pointer")}
        onClick={() => {
          const current = new URLSearchParams(
            Array.from(searchParams.entries())
          );
          const page = searchParams.get("page") as string;

          current.set("page", (Number(page || 1) + 1).toString());

          const query = `?${current.toString()}`;

          router.push(`${pathname}${query}`);
        }}
      >
        <p>{`Next->`}</p>
      </div>
    </div>
  );
}
