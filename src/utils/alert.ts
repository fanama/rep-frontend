import { notification } from "antd";
export const openNotification = (
  title: string,
  description: string,
  duration: number = 5
) => {
  const args = {
    message: title,
    description: description,
    duration,
  };
  notification.open(args);
};
