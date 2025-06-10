import React, { ReactNode } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ImageBackground, StyleSheet, View } from "react-native";
import HeaderBar from "@/components/HeaderBar";

import Index from "./index";
import Weekly from "./weekly";
import Today from "./today";

const Tab = createMaterialTopTabNavigator();

interface BackgroundWrapperProps {
  children: ReactNode;
}

const BackgroundWrapper = ({ children }: BackgroundWrapperProps) => (
  <ImageBackground
    source={require("@/assets/images/sunset.png")}
    style={styles.background}
    resizeMode="cover"
  >
    {children}
  </ImageBackground>
);

export default function RootLayout() {
  return (
    <View style={styles.container}>
      <HeaderBar />
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          component={(props: any) => (
            <BackgroundWrapper>
              <Index {...props} />
            </BackgroundWrapper>
          )}
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
          component={(props: any) => (
            <BackgroundWrapper>
              <Today {...props} />
            </BackgroundWrapper>
          )}
          name="today"
          options={{
            title: "Today",
            tabBarIcon: () => (
              <MaterialIcons name="today" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          component={(props: any) => (
            <BackgroundWrapper>
              <Weekly {...props} />
            </BackgroundWrapper>
          )}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  tabBar: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
  },
});
