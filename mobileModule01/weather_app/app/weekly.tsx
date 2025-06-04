import { useSearch } from "@/context/SearchContext";

import { Text, View } from "react-native";

const Weekly = () => {
  const { searchText } = useSearch();

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
