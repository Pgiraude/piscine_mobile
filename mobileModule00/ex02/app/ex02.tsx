import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

const Row = ({ children }: { children: React.ReactNode }) => {
  return <View style={{ flexDirection: "row", flex: 1 }}>{children}</View>;
};

const Column = ({ str }: { str: string }) => {
  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log(`pressed ${str}`);
        }}
      >
        <Text style={styles.buttonText}>{str}</Text>
      </Pressable>
    </View>
  );
};

const Ex02Screen: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [result, setResult] = useState(0);

  return (
    <View style={styles.centerContainer}>
      <View
        style={{
          alignItems: "flex-end",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: 20,
        }}
      >
        <Text style={styles.title}>{number}</Text>
        <Text style={styles.title}>{result}</Text>
      </View>
      <View style={{ width: "100%", flex: 5, marginHorizontal: "auto" }}>
        <Row>
          <Column str="7" />
          <Column str="8" />
          <Column str="9" />
          <Column str="C" />
          <Column str="AC" />
        </Row>
        <Row>
          <Column str="4" />
          <Column str="5" />
          <Column str="6" />
          <Column str="+" />
          <Column str="-" />
        </Row>
        <Row>
          <Column str="1" />
          <Column str="2" />
          <Column str="3" />
          <Column str="x" />
          <Column str="/" />
        </Row>
        <Row>
          <Column str="0" />
          <Column str="." />
          <Column str="00" />
          <Column str="=" />
          <Column str="" />
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkgray",
    borderWidth: 1,
    borderColor: "black",
    width: "100%",
    flex: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
  },
});

export default Ex02Screen;
