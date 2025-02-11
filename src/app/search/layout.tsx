import SearchForm from "./search-form";
import { PropsWithChildren } from "react";

export default function SearchPage(props: PropsWithChildren) {
  return (
    <main className="bg-background flex flex-col items-center min-h-screen p-2">
      <div className="lg:w-[80vw] flex justify-center">
        <SearchForm />
      </div>
      {props.children}
    </main>
  );
}
