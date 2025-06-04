import React from "react";
import { View, Platform, StatusBar, SafeAreaView } from "react-native";

import Dropdown from "./Dropdown";
import GeolocButton from "./GeolocButton";

const HeaderBar = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          padding: 10,
          gap: 10,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <Dropdown />
        <GeolocButton />
      </View>
    </SafeAreaView>
  );
};

export default HeaderBar;
