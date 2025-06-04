import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

const Ex00Screen: React.FC = () => {
  return (
    <>
      <View style={styles.centerContainer}>
        <Text style={styles.title}>A simple text</Text>
        <Pressable
          style={styles.button}
          onPress={() => {
            console.log("Button pressed");
          }}
        >
          <Text style={styles.buttonText}>Click me</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "blue",
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Ex00Screen;
