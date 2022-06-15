import { createContext, useContext, useRef, useState } from "react";

export type PushNotification = (element: JSX.Element, dismissAfter?: number) => void;
export type PushNotificationDefault = (element: JSX.Element) => void;

export type NotificationContextType = {
    pushNotification: PushNotification;
    pushNotificationDefault: PushNotificationDefault;
}

export const NotificationContext = createContext<NotificationContextType | null>(null);

export type Notification = { key: number, element: JSX.Element };

export const NotificationProvider: React.FC = ({
    children
}) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const nextKey = useRef(0);

    function deleteNotification(toDelete: Notification) {
        setNotifications(prev => (
            prev.filter(notification => notification !== toDelete)
        ));
    }

    const pushNotification: PushNotification = (element, dismissAfter) => {
        const notification = { key: nextKey.current++, element };
        setNotifications(prev => [notification, ...prev]);

        if (!dismissAfter) return;

        setTimeout(() => deleteNotification(notification), dismissAfter);
    }

    const pushNotificationDefault: PushNotificationDefault = (element) => {
        pushNotification(element, 3000);
    }

    const [value] = useState({ pushNotification, pushNotificationDefault });

    return (
        <NotificationContext.Provider value={value}>
            <div className="fixed bottom-8 right-16 w-64 z-50 flex flex-col-reverse gap-2">
                {notifications.map(({ element, key }) => (
                    <div key={key} className="w-full">
                        {element}
                    </div>
                ))}
            </div>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotificationContext = () => {
    return useContext(NotificationContext);
};
