import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { Avatar, Header } from "@/src/Components";
import { icons } from "@/assets/icons/icons";
import { Feather } from '@expo/vector-icons';

type ProfileCardProps = {
  name: string;
  phone: string;
  email: string;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ name, phone, email }) => (
  <View style={styles.profileCard}>
    <Avatar></Avatar>
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.phone}>{phone}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  </View>
);

type SettingsItemProps = {
  icon: string;
  label: string;
  onPress: () => void;
};

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  label,
  onPress,
}) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.container4}>
      <View style={styles.container3}>
        <View>
            <Image source={icon} style={styles.image}></Image>
        </View>
        {/* <Text style={styles.icon}>{icon}</Text> */}
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
    <View>
        <Feather name='chevron-right' color={'#015158'} size={18} ></Feather>
      {/* <Text style={styles.arrow}>{">"}</Text> */}
    </View>
  </TouchableOpacity>
);

type SettingsOption = {
  icon: string;
  label: string;
};

const settingsOptions: SettingsOption[] = [
  { icon: icons.ProfileIcon1, label: "PO Management" },
  { icon: icons.ProfileIcon2, label: "Users Management" },
  { icon: icons.ProfileIcon3, label: "Report" },
  { icon: icons.ProfileIcon4, label: "About Us" },
  { icon: icons.ProfileIcon5, label: "Contact Us" },
  { icon: icons.ProfileIcon5, label: "Change Language" },
  { icon: icons.ProfileIcon6, label: "Logout" },
];

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Header Title="My Account"></Header>
      <View style={styles.container2}>
        <ProfileCard
          name="Abdullah"
          phone="+9665555555"
          email="email@email.com"
        />
      </View>
      <Text style={styles.settingsHeader}>Settings</Text>
      <FlatList
        data={settingsOptions}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <SettingsItem
            icon={item.icon}
            label={item.label}
            onPress={() => {}}
          />
        )}
      />
    </View>
  );
};

export default ProfileScreen;
