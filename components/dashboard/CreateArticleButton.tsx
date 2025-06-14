'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';

/**
 * A button that shows a spinner while we route to the “create article” page.
 */
export default function CreateArticleButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push('/dashboard/articles/create');
  };

  return (
    <Button
      onClick={handleClick}
      className="gap-2 cursor-pointer"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
         
        </>
      ) : (
        <>
          <PlusCircle className="h-4 w-4" />
          New Article
        </>
      )}
    </Button>
  );
}
