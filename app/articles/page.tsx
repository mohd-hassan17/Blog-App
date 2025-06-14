import { Button } from "@/components/ui/button";
import React, { Suspense } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import ArticleSearchInput from "@/components/articles/article-search";
import AllArticlePage from "@/components/articles/all-article";
import { fetchArticleByQuery } from "@/lib/query/fetch-articles";
import { Skeleton } from "@/components/ui/skeleton";

type SearchPageProps = {
  // 👇  It is a Promise now
  searchParams: Promise<{ search?: string; page?: string }>;
};

const ITEMS_PER_PAGE = 3; // Number of items per page


const Article = async ({ searchParams }: SearchPageProps) => {


 const { search = "", page = "1" } = await searchParams;

  const currentPage = Number(page);
  const skip        = (currentPage - 1) * ITEMS_PER_PAGE;
  const take        = ITEMS_PER_PAGE;

  const { articles, total } = await fetchArticleByQuery(search, skip, take);
  const totalPages          = Math.ceil(total / ITEMS_PER_PAGE);

    return(
     <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            All Articles
          </h1>
          {/* Search Bar */}
          <Suspense >
            <ArticleSearchInput />
          </Suspense>
        </div>
        {/* All article page  */}
        <Suspense fallback={<AllArticlesPageSkeleton/>}>
                

        <AllArticlePage articles={articles} />
        </Suspense>
        {/* <AllArticlesPageSkeleton/> */}
        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          {/* Prev Button */}
          <Link
            href={`?search=${search}&page=${currentPage - 1}`}
            passHref
          >
            <Button variant="ghost" size="sm" disabled={currentPage === 1}>
              ← Prev
            </Button>
          </Link>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <Link
              key={index}
              href={`?search=${search}&page=${index + 1}`}
              passHref
            >
              <Button
                variant={`${currentPage === index + 1 ? 'destructive' : 'ghost'}`}
                size="sm"
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </Button>
            </Link>
          ))}

          {/* Next Button */}
          <Link
            href={`?search=${search}&page=${currentPage + 1}`}
            passHref
          >
            <Button
              variant="ghost"
              size="sm"
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            >
              Next →
            </Button>
          </Link>
        </div>
      </main>
    </div>
    )
}

export default Article;


export function AllArticlesPageSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className="group relative overflow-hidden transition-all hover:shadow-lg"
        >
          <div className="p-6">
            {/* Article Image Skeleton */}
            <Skeleton className="mb-4 h-48 w-full rounded-xl bg-gradient-to-br from-purple-100/50 to-blue-100/50 dark:from-purple-900/20 dark:to-blue-900/20" />

            {/* Article Title Skeleton */}
            <Skeleton className="h-6 w-3/4 rounded-lg" />

            {/* Article Category Skeleton */}
            <Skeleton className="mt-2 h-4 w-1/2 rounded-lg" />

            {/* Author & Metadata Skeleton */}
            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Author Avatar Skeleton */}
                <Skeleton className="h-8 w-8 rounded-full" />

                {/* Author Name Skeleton */}
                <Skeleton className="h-4 w-20 rounded-lg " />
              </div>

              {/* Date Skeleton */}
              <Skeleton className="h-4 w-24 rounded-lg " />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}