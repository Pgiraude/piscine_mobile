import React from "react";
import { ScrollView, View } from "react-native";
import customStyles from "@/styles/styles";

type ScrollWeatherItemsProps = {
  children: React.ReactNode;
};

const ScrollWeatherItems = ({ children }: ScrollWeatherItemsProps) => {
  return (
    <View style={customStyles.scrollCardContainer}>
      <ScrollView
        horizontal
        nestedScrollEnabled={true}
        style={customStyles.scrollCard}
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "stretch",
          paddingHorizontal: 10,
        }}
        scrollEventThrottle={16}
        decelerationRate="normal"
        snapToInterval={220}
        snapToAlignment="start"
      >
        {children}
      </ScrollView>
    </View>
  );
};

export default ScrollWeatherItems;
