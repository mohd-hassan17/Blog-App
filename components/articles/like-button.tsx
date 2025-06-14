"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/actions/like-toggle";
import type { Like } from "@/app/generated/prisma";

type LikeButtonProps = {
  articleId: string;
  likes: Like[];
  isLiked: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  likes,
  isLiked,
}) => {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes.length);
  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    
    startTransition(async () => {
      setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1); // Optimistically update UI
      await toggleLike(articleId);
    });
  };

  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <form action={handleLike}>
        <Button
          type="button"
          variant="ghost"
          className="gap-2 cursor-pointer"
          onClick={handleLike}
          disabled={isPending}
        >
          <ThumbsUp className="h-5 w-5" />
          {optimisticLikes}
        </Button>
      </form>
      <Button variant="ghost" className="gap-2 cursor-pointer">
        <Bookmark className="h-5 w-5 " /> Save
      </Button>
      <Button variant="ghost" className="gap-2 cursor-pointer">
        <Share2 className="h-5 w-5 " /> Share
      </Button>
    </div>
  );
};

export default LikeButton;