import { Text } from "react-native";
import { View } from "react-native";

export const toastConfig = {
  success: ({ text1, text2 }: { text1: string; text2?: string }) => (
    <View style={styles.success}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
  error: ({ text1, text2 }: { text1: string; text2?: string }) => (
    <View style={styles.error}>
      <Text style={styles.text1}>{text1}</Text>
      {text2 && <Text style={styles.text2}>{text2}</Text>}
    </View>
  ),
  info: ({ text1, text2 }: { text1: string; text2?: string }) => (
    <View style={styles.info}>
      <Text style={styles.text1}>{text1}</Text>
      {/* {text2 && <Text style={styles.text2}>{text2}</Text>} */}
    </View>
  ),
};

const styles = {
  success: {
    padding: 15,
    backgroundColor: "#4BB543",
    borderRadius: 10,
    alignSelf: "flex-end",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  error: {
    padding: 15,
    backgroundColor: "#FF3333",
    borderRadius: 10,
    marginHorizontal: 20,
    alignSelf: "flex-end",

    marginBottom: 20,
  },
  info: {
    padding: 15,
    backgroundColor: "#0077CC",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  text1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  text2: {
    color: "white",
    fontSize: 14,
    marginTop: 4,
  },
};
