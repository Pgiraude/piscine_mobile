import React, { useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import useGetCities from "@/hooks/useGetCities";
import useStore from "@/store/useStore";
import { City, CityInfosStatusEnum } from "@/type/city.type";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Dropdown = () => {
  const setCityInfos = useStore((state) => state.setCityInfos);

  const { results, fetchCities, error } = useGetCities();

  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (error) {
      setCityInfos({ data: undefined, status: CityInfosStatusEnum.API_ERROR });
    }
  }, [error, setCityInfos]);

  const handleChangeText = (text: string) => {
    setSearchText(text);
    setShowDropdown(true);
    if (text) fetchCities(text);
  };

  const onOptionPress = (option: City) => {
    setCityInfos({ data: option, status: CityInfosStatusEnum.SUCCESS });
    setSearchText("");
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    if (results && results.length > 0) {
      setCityInfos({ data: results[0], status: CityInfosStatusEnum.SUCCESS });
    } else {
      setCityInfos({ data: undefined, status: CityInfosStatusEnum.NOT_FOUND });
    }
    setSearchText("");
    setShowDropdown(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={handleChangeText}
        placeholder="Rechercher une ville..."
        onBlur={() => setShowDropdown(false)}
        onSubmitEditing={handleSubmit}
      />
      {showDropdown && (
        <>
          <TouchableWithoutFeedback onPress={() => setShowDropdown(false)}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
          {results && results.length > 0 && (
            <View style={styles.dropdown}>
              <FlatList
                data={results.slice(0, 5)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => onOptionPress(item)}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                      padding: 10,
                    }}
                  >
                    <FontAwesome5 name="city" size={18} color="black" />
                    <Text style={styles.item}>
                      <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                      {` ${item.admin1}, ${item.country}`}
                    </Text>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={true}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: "transparent",
  },
  dropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    zIndex: 1001,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});

export default Dropdown;
