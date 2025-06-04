import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const Weekly = () => {
  const { searchText } = useLocalSearchParams();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Weekly</Text>
      <Text>{searchText}</Text>
    </View>
  );
};

export default Weekly;
