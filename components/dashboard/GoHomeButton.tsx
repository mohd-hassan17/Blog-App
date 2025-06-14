'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLoadingScreen from '@/app/dashboard/loading';
export default function GoHomeButton() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = () => {
    setIsNavigating(true);
    router.push('/');
  };

  if (isNavigating) {
    return <DashboardLoadingScreen />;
  }

  return (
    <button onClick={handleClick} className="text-xl font-bold cursor-pointer">
      DevNotes
    </button>
  );
}
