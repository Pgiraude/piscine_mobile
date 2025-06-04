import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { evaluate } from "mathjs";

const Row = ({ children }: { children: React.ReactNode }) => {
  return <View style={{ flexDirection: "row", flex: 1 }}>{children}</View>;
};

type ColumnProps = {
  str: string;
  equation: string;
  setEquation: (equation: string) => void;
  setResult: (result: string) => void;
};

const operators = ["+", "-", "x", "/"];

const ERROR_MESSAGE = "Error";

const Column = ({ str, equation, setEquation, setResult }: ColumnProps) => {
  const handlePress = () => {
    console.log(equation);
    console.log(`pressed ${str}`);
    try {
      switch (str) {
        case "AC":
          setEquation("0");
          setResult("0");
          break;
        case "C":
          setEquation(equation.slice(0, -1));
          break;
        case ".":
          if (!equation.includes(".")) {
            setEquation(equation + str);
          }
          break;
        case "=":
          setResult(evaluate(equation.replace("x", "*")));
          break;
        default:
          if (operators.includes(str)) {
            setEquation(equation + str);
          } else if (equation === "0") {
            setEquation(str);
          } else {
            setEquation(equation + str);
          }
      }
    } catch {
      setEquation("0");
      setResult(ERROR_MESSAGE);
    }
  };

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>{str}</Text>
      </Pressable>
    </View>
  );
};

const Ex02Screen: React.FC = () => {
  const [equation, setEquation] = useState("0");
  const [result, setResult] = useState("0");

  const calculatorGrid = [
    ["7", "8", "9", "C", "AC"],
    ["4", "5", "6", "+", "-"],
    ["1", "2", "3", "x", "/"],
    ["0", ".", "00", "=", ""],
  ];

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
        <Text style={styles.title}>{equation}</Text>
        <Text style={styles.title}>{result}</Text>
      </View>
      <View style={{ width: "100%", flex: 5, marginHorizontal: "auto" }}>
        {calculatorGrid.map((row, rowIndex) => (
          <Row key={rowIndex}>
            {row.map((column, columnIndex) => (
              <Column
                str={column}
                key={columnIndex}
                equation={equation}
                setEquation={setEquation}
                setResult={setResult}
              />
            ))}
          </Row>
        ))}
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
    padding: 15,
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
