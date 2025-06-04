import useStore from "@/store/useStore";
import { Text, View } from "react-native";
import React from "react";

const Today = () => {
  const searchText = useStore((state) => state.searchText);
  const isGeoError = useStore((state) => state.isGeoError);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isGeoError ? (
        <Text style={{ color: "red" }}>{searchText}</Text>
      ) : (
        <>
          <Text>Today</Text>
          <Text>{searchText}</Text>
        </>
      )}
    </View>
  );
};

export default Today;
