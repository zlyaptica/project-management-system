import { NotificationInstance } from "antd/es/notification/interface";

export type NotificationType = "success" | "info" | "warning" | "error";

export interface INotification {
  api: NotificationInstance;
  type: NotificationType;
  message: string;
  description: string;
}

export const openNotificationWithIcon = (notification: INotification) => {
  notification.api[notification.type]({
    message: notification.message,
    description: notification.description,
  });
};
