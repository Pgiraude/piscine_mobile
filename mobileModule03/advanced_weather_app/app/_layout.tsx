import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import HeaderBar from "@/components/HeaderBar";

import Index from "./index";
import Weekly from "./weekly";
import Today from "./today";
import {
  SceneMap,
  TabView,
  Route,
  NavigationState,
} from "react-native-tab-view";

const renderScene = SceneMap({
  index: Index,
  today: Today,
  weekly: Weekly,
});

const getRouteIcon = (key: string, focused: boolean) => {
  const color = focused ? "black" : "gray";
  switch (key) {
    case "index":
      return (
        <MaterialCommunityIcons name="weather-cloudy" size={24} color={color} />
      );
    case "today":
      return <MaterialIcons name="today" size={24} color={color} />;
    case "weekly":
      return (
        <MaterialCommunityIcons name="calendar-week" size={24} color={color} />
      );
    default:
      return null;
  }
};

const CustomTabBar = ({
  navigationState,
  jumpTo,
}: {
  navigationState: NavigationState<Route>;
  jumpTo: (key: string) => void;
}) => (
  <View
    style={{
      flexDirection: "row",
      backgroundColor: "rgba(255,255,255,1)",
      justifyContent: "space-around",
      alignItems: "center",
      height: 56,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
    }}
  >
    {navigationState.routes.map((route, idx) => {
      const focused = navigationState.index === idx;
      return (
        <TouchableOpacity
          key={route.key}
          onPress={() => jumpTo(route.key)}
          style={{ alignItems: "center", flex: 1 }}
        >
          {getRouteIcon(route.key, focused)}
          <Text style={{ fontSize: 12, color: focused ? "black" : "gray" }}>
            {route.title}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

export default function RootLayout() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "index", title: "Currently" },
    { key: "today", title: "Today" },
    { key: "weekly", title: "Weekly" },
  ]);

  return (
    <ImageBackground
      source={require("@/assets/images/sun-down.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <HeaderBar />
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => <CustomTabBar {...props} />}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  tabBar: {
    backgroundColor: "transparent",
  },
});
