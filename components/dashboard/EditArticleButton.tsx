'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function EditArticleButton({ articleId }: { articleId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push(`/dashboard/articles/${articleId}/edit`);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="bg-gray-800 text-white cursor-pointer gap-2"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
        
        </>
      ) : (
        'Edit'
      )}
    </Button>
  );
}
