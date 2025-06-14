"use client";
import { FormEvent, startTransition, useActionState, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { editArticle } from "@/actions/edit-article";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import { Loader2 } from "lucide-react";
import  { Articles } from "@/app/generated/prisma";
import Image from "next/image";
import Link from "next/link";


type editProps ={
    article: Articles
}

const EditArticlePage =  ({article}: editProps) => {
     const [content, setContent] = useState(article.content);
      const [formState, action, isPending] = useActionState(editArticle.bind(null, article.id), { errors: {} });
    
      const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    
        e.preventDefault();
    
        const formData = new FormData(e.currentTarget);
        formData.append("content", content)
    
        startTransition(() => {
          action(formData);    
        });
      }
    
      return (
        <div className="max-w-4xl mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl ">Edit your Article</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="title" className="pl-1">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter article title"
                    defaultValue={article.title}
                  />
                  {formState.errors.title && (
                    <span className="font-medium text-sm text-red-500">
                      {formState.errors.title}
                    </span>
                  )}
                </div>
    
                <div className="space-y-2 ">
                  <Label htmlFor="category " className="pl-1">Category</Label>
                  <select
                    id="category"
                    name="category"
                    defaultValue={article.category}
                    className="flex h-10 w-full  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="" disabled hidden>
                      Select Category
                    </option>
                    <option value="technology">Technology</option>
                    <option value="programming">Programming</option>
                    <option value="web-development">Web Development</option>
                    <option value="Generative-AI">Generative-AI</option>
                    <option value="machine-learning">Machine Learning</option>
                  </select>
    
                  {formState.errors.category && (
                    <span className="font-medium text-sm text-red-500">
                      {formState.errors.category}
                    </span>
                  )}
                </div>
    
                <div className="space-y-2">
                  <Label htmlFor="featuredImage" className="pl-1">Featured Image</Label>
                  {article.featuredImage && (
                <div className="mb-4">
                  <Image
                    src={article.featuredImage}
                    alt="Current featured"
                    width={192}
                    height={128}  
                    className="object-cover rounded-md"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Current featured image
                  </p>
                </div>
              )}
                  <Input
                    id="featuredImage"
                    name="featuredImage"
                    type="file"
                    accept="image/*"
                  />
                  {/* {formState.errors.featuredImage && (
                    <span className="font-medium text-sm text-red-500">
                      {formState.errors.featuredImage}
                    </span>
                  )} */}
                </div>
    
                <div className="space-y-2 pl-2">
                  <Label>Content</Label>
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                  />
    
                  {formState.errors.content && (
                    <span className="font-medium text-sm text-red-500">
                      {formState.errors.content[0]}
                    </span>
                  )}
                </div>
                {/* {formState.errors.formErrors && (
                  <div className="dark:bg-transparent bg-red-100 p-2 border border-red-600">
                    <span className="font-medium text-sm text-red-500">
                      {formState.errors.formErrors}
                    </span>
                  </div>
                )} */}
                <div className="flex justify-end gap-4">
                   
                    <Button type="button" variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                   
                  
                  <Button type="submit" disabled={isPending} className="cursor-pointer flex items-center">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading…
                      </>
                    ) : (
                      "Edit Article"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
    )
}

export default EditArticlePage;