// components/ErrorDisplay.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";

type ErrorDisplayProps = {
  errorMessage: string;
};

const ErrorDisplay = ({ errorMessage }: ErrorDisplayProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  message: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
});

export default ErrorDisplay;
