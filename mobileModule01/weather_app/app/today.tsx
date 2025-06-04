import { useSearch } from "@/context/SearchContext";

import { Text, View } from "react-native";

const Today = () => {
  const { searchText } = useSearch();

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
