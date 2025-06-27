import customStyles from "@/styles/styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { View, Text } from "react-native";

type ErrorDisplayProps = {
  errorMessage: string;
};

const ErrorDisplay = ({ errorMessage }: ErrorDisplayProps) => {
  return (
    <View style={customStyles.card}>
      <FontAwesome6 name="triangle-exclamation" size={50} color="red" />
      <Text style={customStyles.subtitle}>{errorMessage}</Text>
    </View>
  );
};

export default ErrorDisplay;
