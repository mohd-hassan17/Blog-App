import { FileText, MessageCircle, PlusCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RecentArticles from "./recent-articles";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import CreateArticleButton from "./CreateArticleButton";


const BlogDashboard = async () => {

  const [articles, totalComments] = await Promise.all([
    prisma.articles.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        comments: true,
        author: {
          select: { name: true, email: true, imageUrl: true },
        },
      },
    }),
    prisma.comment.count(),
  ]);


  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Blog Dashboard</h1>
          <p className="text-muted-foreground pt-2">
            Manage your content and analytics
          </p>
        </div>
       <CreateArticleButton />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-medium font-sm">
              Total Articles
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              +5 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-medium font-sm">
              Total Comments
            </CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground mt-2">
              12 awaiting moderation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-medium font-sm">
              Avg. Reading Time
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2m</div>
            <p className="text-xs text-muted-foreground mt-2">
              +0.8m from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles */}
      <RecentArticles articles={articles} />
    </main>
  )
}

export default BlogDashboard;