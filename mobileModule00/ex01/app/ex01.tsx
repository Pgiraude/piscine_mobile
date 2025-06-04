import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

const Ex01Screen: React.FC = () => {
  const simpleText = "A simple text";
  const helloWorld = "Hello World";
  const [message, setMessage] = useState(simpleText);

  return (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>{message}</Text>
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log("Button pressed");
          setMessage(message === simpleText ? helloWorld : simpleText);
        }}
      >
        <Text style={styles.buttonText}>Click me</Text>
      </Pressable>
    </View>
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
    padding: 15,
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

export default Ex01Screen;
