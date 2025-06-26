import customStyles from "@/styles/styles";
import { View, Text } from "react-native";

const Welcome = () => {
  return (
    <View style={customStyles.card}>
      <Text style={customStyles.title}>Bonjour</Text>
      <Text style={customStyles.subtitle}>
        Choisissez une ville pour afficher la météo
      </Text>
    </View>
  );
};

export default Welcome;
