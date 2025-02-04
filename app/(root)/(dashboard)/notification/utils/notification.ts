import { Notification } from "@/types/notification"

export const filterNotifications = (
  notifications: Notification[],
  filter: "All" | "New" | "Unread",
): Notification[] => {
  switch (filter) {
    case "All":
      return notifications
    case "New":
      return notifications.filter((notification) => notification.status === "New")
    case "Unread":
      return notifications.filter((notification) => notification.status !== "Read")
    default:
      return notifications
  }
}
