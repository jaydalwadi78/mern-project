import { Store } from 'react-notifications-component'
const showNotification = (title = '', message = '', type = 'success', position = 'top', duration = 1000) => {
  Store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: position,
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: duration,
      timingFunction: 'ease-in',
      onScreen: true
    }
  });
}
export default showNotification;