import React from "react";
import { View, Platform, StatusBar, SafeAreaView } from "react-native";

import Dropdown from "./Dropdown";
import GeolocButton from "./GeolocButton";

const HeaderBar = () => {
  return (
    <SafeAreaView
      style={{ flex: 0, zIndex: 1000, backgroundColor: "rgba(42, 32, 56, 1)" }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          padding: 10,
          gap: 10,
          backgroundColor: "rgba(42, 32, 56, 1)",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          zIndex: 1000,
        }}
      >
        <Dropdown />
        <GeolocButton />
      </View>
    </SafeAreaView>
  );
};

export default HeaderBar;
