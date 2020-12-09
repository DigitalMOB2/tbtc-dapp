import React, { useContext, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import { Notification } from 'components/Notification';

const noop = () => null;

export const GeneralContext = React.createContext({
  notifications: {
    /** @type {TGeneralContext$addNotification} */
    addNotification: noop,
    /** @type {TGeneralContext$removeNotification} */
    removeNotification: noop,
    /** @type {TGeneralContext$clearNotifications} */
    clearNotifications: noop,
  },
});

const notificationsNode = document.querySelector('#notifications-root');

export const GeneralProvider = ({ children }) => {
  /** @type {[TGeneralContext$notification[], React.Dispatch<React.SetStateAction<TGeneralContext$notification[]>>]} */
  const [notifications, setNotifications] = React.useState([]);

  const addNotification = React.useCallback(
    (message, { level = 'error', timeout, override = false } = {}) => {
      if (message) {
        const nItem = { id: nanoid(), message, level, timeout };

        setNotifications((ns) => [...(override ? [] : ns), nItem]);
      }
    },
    [setNotifications]
  );

  const removeNotification = React.useCallback(
    (id) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((n) => n.id !== id)
      );
    },
    [setNotifications]
  );

  const clearNotifications = React.useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  const notificationActions = useMemo(
    () => ({
      addNotification,
      removeNotification,
      clearNotifications,
    }),
    [addNotification, removeNotification, clearNotifications]
  );

  return (
    <GeneralContext.Provider
      value={{
        notifications: notificationActions,
      }}
    >
      {children}
      {notificationsNode &&
        ReactDOM.createPortal(
          <>
            {notifications.map((n) => (
              <Notification key={n.id} n={n} onClose={removeNotification} />
            ))}
          </>,
          notificationsNode
        )}
    </GeneralContext.Provider>
  );
};

export function useGeneral() {
  return useContext(GeneralContext);
}
