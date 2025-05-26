import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    I18nManager,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../../i18n';
import { styles } from './style';

const LANGUAGE_KEY = 'APP_LANGUAGE';

const LanguageSwitcher = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [rtl, setRtl] = useState(I18nManager.isRTL);

    const handleLanguageChange = async (lang: string) => {
        await i18n.changeLanguage(lang);
        await AsyncStorage.setItem(LANGUAGE_KEY, lang);

        const shouldBeRTL = lang === 'ar';
        if (I18nManager.isRTL !== shouldBeRTL) {
            I18nManager.allowRTL(true);
            I18nManager.forceRTL(shouldBeRTL);
        }

        setRtl(shouldBeRTL);
        setModalVisible(false);
    };

    const loadLanguage = async () => {
        const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (storedLang && storedLang !== i18n.language) {
            await i18n.changeLanguage(storedLang);

            const shouldBeRTL = storedLang === 'ar';
            if (I18nManager.isRTL !== shouldBeRTL) {
                I18nManager.allowRTL(true);
                I18nManager.forceRTL(shouldBeRTL);
                setRtl(shouldBeRTL);
            }
        }
    };

    useEffect(() => {
        loadLanguage();
    }, []);

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                <Ionicons name="globe-outline" size={20} color="black" />
            </TouchableOpacity>

            <Modal transparent visible={modalVisible} animationType="fade">
                <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)} />
                <View
                    style={[
                        styles.modal,
                        rtl ? { left: 20, right: 'auto' } : { right: 20, left: 'auto' },
                    ]}
                >
                    <Text style={styles.label}>Select Language</Text>

                    <TouchableOpacity
                        style={styles.langButton}
                        onPress={() => handleLanguageChange('en')}
                    >
                        <Text style={styles.langText}>English</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.langButton}
                        onPress={() => handleLanguageChange('ar')}
                    >
                        <Text style={styles.langText}>العربية</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};

export default LanguageSwitcher;
