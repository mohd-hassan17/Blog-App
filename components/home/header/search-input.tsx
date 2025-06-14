"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { searchAction } from "@/actions/search";

const SearchInput = () => {
  const params = useSearchParams();

  
  return (
    <form action={searchAction}>
  <div className="relative">
    {/* 📱 Small devices */}
    {/* <div className="sm:hidden">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        name="search"
        defaultValue={params.get("search") || ""}
        placeholder="Search.."
        className="pl-8 w-30 focus-visible:ring-1"
      />
    </div> */}

    {/* 🖥️ Medium and up */}
    <div className="hidden sm:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        name="search"
        defaultValue={params.get("search") || ""}
        placeholder="Search articles..."
        className="pl-10 w-48 focus-visible:ring-1"
      />
    </div>
  </div>
</form>
  );
};

export default SearchInput;