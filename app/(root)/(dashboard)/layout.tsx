'use client';
import Sidebar from '@/components/Dashboard/Sidebar';
import { useState } from 'react';

export default function DashbaordLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="antialiased flex flex-col md:flex-row h-screen dark:bg-[#2E2E2E] bg-cdneutral-gray">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="flex-1 flex flex-col">
        <div className="overflow-y-auto dark:bg-[#2E2E2E] bg-cdneutral-white">{children}</div>
      </div>
    </div>
  );
}
