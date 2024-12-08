import axios from "../api/axios";

export type AdminNotificationDto = {
  _id?: string;
  clerkId?: {
    username?: string;
  };
  count: number;
  updatedAt: string;
};

export const fetchAdminNotifications = async () => {
  const result = await axios.get("/admin/notifications");
  const data = result.data as AdminNotificationDto[];
  return data;
};

export const resetAdminNotifications = async (notificationIds: string[]) => {
  const result = await axios.put("/admin/reset-notifications", {
    notificationIds,
  });
  const data = result.data;
  return data;
};
