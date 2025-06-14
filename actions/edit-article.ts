"use server"

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {z} from "zod";
import {v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

const createArticlesSchema = z.object({
    title: z.string().min(3).max(50),
    category: z.string().min(3).max(50),
    content: z.string().min(30)
})

type createArticleFormState = {
    errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
}

export const editArticle = async (articleId: string, prevState: createArticleFormState,formData: FormData): Promise<createArticleFormState> => {

    const result = createArticlesSchema.safeParse({
        title: formData.get('title'),
        category: formData.get('category'),
        content: formData.get('content'),
    });

    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors,
        }
    }

    const {userId} = await auth();

    if(!userId){
        return{
            errors:{
                formErrors:["You have to login first"],
            },
        };
    }

    const existingArticle = await prisma.articles.findUnique({
        where:{id:articleId}
    })

    if(!existingArticle){
        return{
            errors:{
                formErrors:["Article not found"]
            }
        }
    }

      // ✅ Check if the user is the author
    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user || existingArticle.authorId !== user.id) {
        return {
            errors: { formErrors: ["You are not authorized to edit this article."] },
        };
    }

    let imageUrl = existingArticle.featuredImage; // Default to the existing image

    // ✅ Check if a new image is provided
    const imageFile = formData.get("featuredImage") as File | null;
    if (imageFile && imageFile.name !== "undefined") {
        try {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResult: UploadApiResponse | undefined = await new Promise(
                (resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { resource_type: "image" },
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(buffer);
                }
            );

            if (uploadResult?.secure_url) {
                imageUrl = uploadResult.secure_url;
            } else {
                return {
                    errors: { featuredImage: ["Failed to upload image. Please try again."] },
                };
            }
        } catch (error) {
            if(error instanceof Error){
                return {
                    errors:{
                        formErrors:[error.message]
                    }
                }
            }else{
                return {
                    errors: { formErrors: ["Error uploading image. Please try again."] },
                };
            }
        }
    }

    // ✅ Update the article in the database
    try {
        await prisma.articles.update({
            where: { id: articleId },
            data: {
                title: result.data.title,
                category: result.data.category,
                content: result.data.content,
                featuredImage: imageUrl, // Updated or existing image
            },
        });
    } catch (error:unknown) {
        if(error instanceof Error){
            return {
                errors:{
                    formErrors:[error.message]
                }
            }
        }else{
            return {
                errors: { formErrors: ["Failed to update the article. Please try again."] },
            };
        }
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
};