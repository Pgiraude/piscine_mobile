import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Tabs } from "expo-router";

import HeaderBar from "@/components/HeaderBar";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <HeaderBar />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Currently",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="weather-cloudy"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: () => (
            <MaterialIcons name="today" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="weekly"
        options={{
          title: "Weekly",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="calendar-week"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
}
