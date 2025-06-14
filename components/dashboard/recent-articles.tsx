"use client";
import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Prisma } from "@/app/generated/prisma";
import { deleteArticle } from "@/actions/delete-article";
import EditArticleButton from "./EditArticleButton";

type RecentArticlesProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};


const RecentArticles: React.FC<RecentArticlesProps> = ({articles}) => {
    return(
  <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Link href={"/articles"}> 
          <Button  variant="ghost" size="sm" className="text-muted-foreground cursor-pointer">
            View All →
          </Button></Link>
         
        </div>
      </CardHeader>

      {!articles.length ? <CardContent className="flex items-center text-center justify-center text-lg">No articles found.</CardContent> : 
      
       <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
           
            {articles.map((article) => (
           
            
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Published
                    </span> 
                  </TableCell>
                  <TableCell>{article.comments.length}</TableCell>
                  <TableCell>{new Date(article.createdAt).toDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                     <EditArticleButton articleId={article.id}/>
                      <DeleteButton  articleId={article.id}/>
                    </div>
                  </TableCell>
                </TableRow>
             ))}
            </TableBody>
          </Table>
        </CardContent>
      }
    </Card>
    )
}

export default RecentArticles;


type deleteButtonProps ={
  articleId: string
}

const DeleteButton= ({articleId}: deleteButtonProps) => {

  const [isPending, startTransition] = useTransition();

  return (
    <form  action={() =>
        startTransition(async () => {
          await deleteArticle(articleId);
        })
      }>
      <Button disabled={isPending} variant="ghost" size="sm" type="submit" className="text-white bg-gray-800 cursor-pointer">
               {isPending? <Loader2 className="mr-2 h-4 w-3 animate-spin" /> : "Delete"}
                             

      </Button>
    </form>
  );
};