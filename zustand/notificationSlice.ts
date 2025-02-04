import { create } from 'zustand';
import newIcon from '@/assets/images/newIcon.svg';
import paymentIcon from '@/assets/images/paymentIcon.svg';
import errorIcon from '@/assets/images/errorIcon.svg';
import { Notification, NotificationState } from '@/types/notification';

const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: '1',
      icon: newIcon,
      title: "New Invoice Created",
      status: "New",
      description: "An invoice with invoice number INV-#001 was successfully created.",
      date: "24/09/2024",
    },
    {
      id: '2',
      icon: paymentIcon,
      title: "Payment of N50,000",
      status: "Read",
      description: "A payment of N50,000 made for invoice number INV-#001",
      date: "24/09/2024",
    },
    {
      id: '3',
      icon: errorIcon,
      title: "Error Processing Upgrade",
      status: "New",
      description: "Please review the card details and fix the error to process your payment",
      date: "24/09/2024",
    },
    ...Array.from({ length: 5 }, (_, index) => ({
      id: (index + 4).toString(),
      icon: paymentIcon,
      title: "Payment of N50,000",
      status: "Read" as "Read",
      description: "A payment of N50,000 made for invoice number INV-#001",
      date: "24/09/2024",
    })),
  ],
  addNotification: (newNotification) => {
    set((state) => {
      const newId = Math.max(...state.notifications.map((n) => parseInt(n.id)), 0) + 1;
      const newNotif: Notification = { ...newNotification, id: newId.toString(), status: "New", date: new Date().toLocaleDateString() };
      return { notifications: [newNotif, ...state.notifications] };
    });
  },
  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        status: "Read",
      })),
    }));
  },
  getNotificationByIdAndMarkAsRead: (id) => {
    const notification = get().notifications.find((notification) => notification.id === id);
    if (notification) {
      notification.status = "Read";
      set((state) => ({
        notifications: state.notifications.map((n) => (n.id === id ? notification : n)),
      }));
    }
    return notification;
  },
  getReadNotificationsCount: () => {
    return get().notifications.filter(notification => notification.status === "New").length;
  },
  deleteNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id.toString()),
    }));
  },
}));

export default useNotificationStore;
