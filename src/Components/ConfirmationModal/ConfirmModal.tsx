import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
} from "react-native";
import { styles } from "./styles";

interface ConfirmModalProps {
    visible: boolean;
    title?: string;
    message: string;
    confirmText: string;
    cancelText: string;
    onCancel: () => void;
    onConfirm: () => void;
    confirmColor?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    visible,
    title,
    message,
    confirmText,
    cancelText,
    onCancel,
    onConfirm,
    confirmColor = "#f44336",
}) => {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <Pressable style={styles.overlay} onPress={onCancel} />
            <View style={styles.modalContainer}>
                {title && <Text style={styles.title}>{title}</Text>}
                <Text style={styles.message}>{message}</Text>
                <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={onCancel} style={styles.button}>
                        <Text style={styles.cancelText}>{cancelText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onConfirm} style={styles.button}>
                        <Text style={[styles.confirmText, { color: confirmColor }]}>
                            {confirmText}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmModal;
