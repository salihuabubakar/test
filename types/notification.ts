export interface Notification {
  id: string;
  icon: string;
  title: string;
  status: 'New' | 'Read';
  description: string;
  date: string;
}

export interface NotificationState {
  notifications: Notification[];
  addNotification: (newNotification: Omit<Notification, 'id'>) => void;
  markAllAsRead: () => void;
  getNotificationByIdAndMarkAsRead: (id: string) => Notification | undefined;
  getReadNotificationsCount: () => number;
  deleteNotification: (id: number) => void;
}