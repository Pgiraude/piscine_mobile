import { useSearch } from "@/context/SearchContext";

import { Text, View } from "react-native";

const Index = () => {
  const { searchText } = useSearch();

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
