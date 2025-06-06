import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HeaderBar from "@/components/HeaderBar";

import Index from "./index";
import Weekly from "./weekly";
import Today from "./today";

const Tab = createMaterialTopTabNavigator();

export default function RootLayout() {
  return (
    <>
      <HeaderBar />
      <Tab.Navigator tabBarPosition="bottom">
        <Tab.Screen
          component={Index}
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
        <Tab.Screen
          component={Today}
          name="today"
          options={{
            title: "Today",
            tabBarIcon: () => (
              <MaterialIcons name="today" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          component={Weekly}
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
      </Tab.Navigator>
    </>
  );
}
