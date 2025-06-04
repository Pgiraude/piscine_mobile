import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Today = () => {
  const { searchText } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Today</Text>
      <Text>{searchText}</Text>
    </View>
  );
};

export default Today;
