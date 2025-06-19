import React, { useEffect } from "react";
import { View, Text, Pressable, Platform, Modal, TouchableWithoutFeedback } from "react-native";
import { useNotifications } from "@/hooks/useNotifications";
import { styles as dropdownStyles } from "../SignoutDropdown/styles";
import { enhancedDropdownStyles } from "./style";
import { useTranslation } from "react-i18next";
import api from "@/services/axios";

// Helper to get translated notification message
function getNotificationMessage(item: any, t: any) {
    if (item.resource_type === 'news-alert') {
        return t('notifications.new_alert_created', {
            user: item.createdByUser?.username || '',
            alert: item.resource_id || ''
        });
    }
    if (item.resource_type === 'attendance-time') {
        let time = '';
        try {
            const msgObj = JSON.parse(item.message);
            time = msgObj.message?.split('at ')[1] || '';
        } catch { }
        return t('notifications.employee_clocked_in', { time });
    }
    if (item.resource_type === 'purchase-order') {
        return t('notifications.purchase_order_created', {
            order: item.resource_id || '',
            user: item.createdByUser?.username || ''
        });
    }
    // fallback
    return item.message || t('notifications.defaultTitle');
}

const NotificationsDropdown = ({ visible, anchor, onClose }: any) => {
    const { t } = useTranslation();
    const { data, isLoading, error, refetch } = useNotifications();
    const notifications = data?.data || [];

    useEffect(() => {
        if (visible) {
            refetch();
        }
    }, [visible, refetch]);

    // Fallback for anchor position if off-screen
    const dropdownLeft = Math.max(16, anchor?.x - 260 || 16);
    const dropdownTop = Math.max(60, anchor?.y + 12 || 60);

    // Mark notification as read
    const markAsRead = async (id: string) => {
        try {
            await api.patch(`/notifications/${id}`, { read: true });
            refetch();
        } catch (e) {
            // Optionally show error toast
        }
    };

    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={enhancedDropdownStyles.overlay}>
                    <TouchableWithoutFeedback>
                        <View
                            style={[
                                dropdownStyles.dropdown,
                                enhancedDropdownStyles.dropdown,
                                {
                                    position: 'absolute',
                                    top: dropdownTop,
                                    left: dropdownLeft,
                                    minWidth: 320,
                                    padding: 0,
                                },
                            ]}
                        >
                            <View style={enhancedDropdownStyles.header}>
                                <Text style={enhancedDropdownStyles.headerText}>{t('notifications.title')}</Text>
                            </View>
                            <View style={{ maxHeight: 400 }}>
                                {isLoading && <Text style={{ padding: 16 }}>{t('notifications.loading')}</Text>}
                                {error && <Text style={{ padding: 16, color: 'red' }}>{t('notifications.error')}</Text>}
                                {!isLoading && !error && notifications.length === 0 && (
                                    <Text style={{ padding: 16, color: '#888' }}>{t('notifications.empty')}</Text>
                                )}
                                {!isLoading && !error && notifications.map((item: any, idx: number) => (
                                    <Pressable
                                        key={item.id}
                                        onPress={() => markAsRead(item.id)}
                                        style={[
                                            enhancedDropdownStyles.notificationItem,
                                            idx === notifications.length - 1 && enhancedDropdownStyles.notificationItemLast,
                                        ]}
                                    >
                                        {/* Unread dot */}
                                        {!item.read && <View style={enhancedDropdownStyles.unreadDot} />}
                                        <View style={enhancedDropdownStyles.notificationTextContainer}>
                                            <Text style={enhancedDropdownStyles.notificationTitle}>{item.title || t('notifications.defaultTitle')}</Text>
                                            <Text style={enhancedDropdownStyles.notificationBody}>{getNotificationMessage(item, t)}</Text>
                                            <Text style={enhancedDropdownStyles.timeAgo}>{t('notifications.since')} {getTimeAgo(item.createdAt, t)}</Text>
                                        </View>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

function getTimeAgo(dateString: string, t: any): string {
    if (!dateString) return '';
    const now = new Date().getTime();
    const date = new Date(dateString).getTime();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return t('notifications.seconds');
    if (diff < 3600) return t('notifications.minutes', { count: Math.floor(diff / 60) });
    if (diff < 86400) return t('notifications.hours', { count: Math.floor(diff / 3600) });
    return t('notifications.days');
}

export default NotificationsDropdown; 