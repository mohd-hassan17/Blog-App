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

const RecentArticles = () => {
    return(
  <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            View All →
          </Button>
        </div>
      </CardHeader>
     
        <CardContent>No articles found.</CardContent>
   
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
           
                <TableRow >
                  <TableCell className="font-medium">title</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Published
                    </span> 
                  </TableCell>
                  <TableCell>comments.length</TableCell>
                  <TableCell>new Date</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/dashboard/articles/${123}/edit`}>
                        <Button variant="ghost" size="sm" className="bg-gray-800  text-white">Edit</Button>
                      </Link>
                      <DeleteButton  />
                    </div>
                  </TableCell>
                </TableRow>
             
            </TableBody>
          </Table>
        </CardContent>
      
    </Card>
    )
}

export default RecentArticles;



const DeleteButton= () => {

  return (
    <form
     
    >
      <Button  variant="ghost" size="sm" type="submit" className="bg-gray-800">
      Delete
      </Button>
    </form>
  );
};