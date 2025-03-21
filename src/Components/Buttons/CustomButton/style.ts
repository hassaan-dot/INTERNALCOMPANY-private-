import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: 50,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
    },
    buttonText: {
      alignSelf: 'center',
      color: '#fff',
      fontSize: 15,
      // fontWeight: '',
    },
    disabledButton: {
      backgroundColor: '#ccc',
    },
  });