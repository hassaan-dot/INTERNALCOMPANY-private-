import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import i18n from '../../i18n';
import { styles } from './style';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import { router } from 'expo-router';

const LanguageSwitcher = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    const handleLanguageChange = async (lang: string) => {
        setSelectedLang(lang);
        await i18n.changeLanguage(lang);

        const isRTL = lang === 'ar';

        if (I18nManager.isRTL !== isRTL) {
            I18nManager.forceRTL(isRTL);
            // RNRestart.Restart(); // Restart the app to apply direction changes
            // router.replace("/");
        } else {
            setModalVisible(false);
        }
    };

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                <Ionicons name="globe-outline" size={20} color="black" />
            </TouchableOpacity>

            <Modal transparent visible={modalVisible} animationType="fade">
                <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)} />
                <View style={styles.modal}>
                    <Text style={styles.label}>System language</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedLang}
                            onValueChange={handleLanguageChange}
                            dropdownIconColor="#666"
                        >
                            <Picker.Item label="English" value="en" />
                            <Picker.Item label="العربية" value="ar" />
                        </Picker>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default LanguageSwitcher;
