import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import i18n from '../../i18n';
import { styles } from './style';

const LanguageSwitcher = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    const handleLanguageChange = (lang: string) => {
        setSelectedLang(lang);
        i18n.changeLanguage(lang);
        setModalVisible(false);
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
