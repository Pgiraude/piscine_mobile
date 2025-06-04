import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Index = () => {
  const { searchText } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Current</Text>
      <Text>{searchText}</Text>
    </View>
  );
};

export default Index;
