import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const router = useRouter();
  return (
    <View style={style.container}>
      <View style={style.header}>
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={"#333"} />
        </TouchableOpacity>
        <View style={style.textWrapper}>
          <Text style={style.text}>User Profile</Text>
        </View>
      </View>
      <Image
        source={{
          uri: "https://xsgames.co/randomusers/avatar.php?g=male",
        }}
        style={style.imageContainer}
      />
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5 ",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    borderRadius: 20,
  },
  textWrapper: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
