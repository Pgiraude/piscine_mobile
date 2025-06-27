import { View, Text, Pressable } from "react-native";

const Login = () => {
  const handleLoginGoogle = () => {
    console.log("Login Google");
  };

  const handleLoginGithub = () => {
    console.log("Login Github");
  };

  return (
    <View>
      <Text>Login</Text>
      <Pressable
        onPress={handleLoginGoogle}
        style={{
          backgroundColor: "rgba(255, 130, 67, 1)",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Continuer avec google</Text>
      </Pressable>

      <Pressable
        onPress={handleLoginGithub}
        style={{
          backgroundColor: "rgba(255, 130, 67, 1)",
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Continuer avec github</Text>
      </Pressable>
    </View>
  );
};

export default Login;
