import { Slot } from "expo-router";
import { ImageBackground } from "react-native";
import { Pressable, Text, View } from "react-native";

export default function RootLayout() {
  return (
    <ImageBackground
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      resizeMode="cover"
      source={require("@/assets/images/night-sky.png")}
    >
      <Slot />
    </ImageBackground>
  );
}
