
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { prisma } from "@/lib/prisma";
import Image from "next/image";

export async function TopArticles() {
//   const articles = await prisma.articles.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//     include: {
//       comments: true,
//       author: {
//         select: {
//           name: true,
//           email: true,
//           imageUrl: true,
//         },
//       },
//     },
//   });

  return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    
        <Card
          className={cn(
            "group relative overflow-hidden transition-all hover:scale-[1.02]",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          )} >
          <div className="p-6">
            <Link href={`/articles/$`}>
              {/* Image Container */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src='/blog.avif'
                  alt='jm'
                  fill
                  className="object-cover"
                />
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  <AvatarImage  />
                  <AvatarFallback>
                 
                  </AvatarFallback>
                </Avatar>
                <span>name</span>
              </div>

              {/* Article Title */}
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
             title
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
             category
              </p>

              {/* Article Meta Info */}
              <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>new Date</span>
                <span>{12} min read</span>
              </div>
            </Link>
          </div>
        </Card>
      
    </div>
  );
}
