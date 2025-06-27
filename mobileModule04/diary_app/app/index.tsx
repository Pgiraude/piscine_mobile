import Login from "@/components/Login";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const handleLogin = () => {
    console.log("Login");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={handleLogin} style={{ width: 200 }}>
        <LinearGradient
          colors={["#FF9800", "#F44336"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            padding: 10,
            borderRadius: 5,
            alignItems: "center",
            width: "100%",
            height: 50,
          }}
        >
          <Text style={{ color: "#fff" }}>Login</Text>
        </LinearGradient>
        <Text style={{ color: "#fff" }}>Login</Text>
      </Pressable>
      <Login />
    </View>
  );
}
