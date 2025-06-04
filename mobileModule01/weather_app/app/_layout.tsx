import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Tabs } from "expo-router";
import { Platform, Pressable, StatusBar, TextInput, View } from "react-native";
import { useState } from "react";
import { SearchProvider, useSearch } from "@/context/SearchContext";
import { SafeAreaView } from "react-native-safe-area-context";

function TabsLayout() {
  const [searchTextLocal, setSearchTextLocal] = useState("");
  const { setSearchText } = useSearch();

  const handleGeolocation = () => {
    setSearchText("Geolocation");
  };

  const handleSearch = () => {
    setSearchText(searchTextLocal);
    setSearchTextLocal("");
  };

  return (
    <Tabs
      screenOptions={{
        header: () => (
          <SafeAreaView>
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
                placeholder="Rechercher une ville..."
                value={searchTextLocal}
                onChangeText={setSearchTextLocal}
                onSubmitEditing={handleSearch}
              />
              <Pressable
                onPress={handleGeolocation}
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#007AFF",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialIcons name="my-location" size={24} color="white" />
              </Pressable>
            </View>
          </SafeAreaView>
        ),
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

export default function RootLayout() {
  return (
    <SearchProvider>
      <TabsLayout />
    </SearchProvider>
  );
}
