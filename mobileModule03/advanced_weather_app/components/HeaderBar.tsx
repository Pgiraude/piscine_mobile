import React from "react";
import { View, Platform, StatusBar, SafeAreaView } from "react-native";

import Dropdown from "./Dropdown";
import GeolocButton from "./GeolocButton";

const HeaderBar = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 0, zIndex: 1000 }}>
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
