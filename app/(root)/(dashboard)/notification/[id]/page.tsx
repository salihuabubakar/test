'use client';
import { useState, useEffect } from "react";
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import useNotificationStore from "@/zustand/notificationSlice";
import { Notification } from "@/types/notification";
import { useParams } from 'next/navigation';

export default function NotificationPage() {
  const params = useParams();
  const { getNotificationByIdAndMarkAsRead } = useNotificationStore();

  const [notification, setNotification] = useState<Notification | undefined>(undefined);

  useEffect(() => {
    const id = params.id as string;
    const foundNotification = getNotificationByIdAndMarkAsRead(id);
    if (foundNotification) {
      setNotification(foundNotification);
    }
  }, [params.id, getNotificationByIdAndMarkAsRead]);

  if (!notification) {
    return notFound; // Optional loading state
  }

  return (
    <div className="h-screen mx-auto px-4 py-8 dark:bg-[#09090b]">
      <Link href="/notification" passHref>
        <Button variant="outline" className="mb-4">
          Back to Notifications
        </Button>
      </Link>
      <div className="bg-white dark:border dark:border-gray-200 dark:bg-[#09090b] rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Image
            src={notification.icon || "/placeholder.svg"}
            alt="Notification Icon"
            width={40}
            height={40}
            className="mr-4"
          />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{notification.title}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{notification.description}</p>
        {notification.date && <p className="text-sm text-gray-500 dark:text-gray-400">Date: {notification.date}</p>}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Status: {notification.status}</p>
      </div>
    </div>
  )
}