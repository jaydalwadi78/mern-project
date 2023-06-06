import { notification } from 'antd';

const [api, contextHolder] = notification.useNotification();

const openNotification = (type, msg, time = 1.5) => {
  api[type]({
      message: msg,
      duration: time,
  });
}
export default openNotification;