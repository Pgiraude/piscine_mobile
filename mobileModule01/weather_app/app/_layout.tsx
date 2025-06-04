import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { Tabs, useRouter } from "expo-router";
import { Pressable, TextInput, View } from "react-native";
import { useState } from "react";

export default function RootLayout() {
  const router = useRouter();
  const [searchTextLocal, setSearchTextLocal] = useState("");

  const handleGeolocation = () => {
    console.log("Geolocation");
    router.setParams({ searchText: "Geolocation" });
  };

  const handleSearch = () => {
    console.log("Search");
    router.setParams({ searchText: searchTextLocal });
    setSearchTextLocal("");
  };

  return (
    <Tabs
      screenOptions={{
        header: () => (
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
