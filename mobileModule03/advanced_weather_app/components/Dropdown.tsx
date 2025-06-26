import React, { useEffect } from "react";
import { useState } from "react";
import {
  FlatList,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
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
        onSubmitEditing={handleSubmit}
      />
      {showDropdown && results && results.length > 0 && (
        <View style={styles.dropdownContainer}>
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
                  backgroundColor: "transparent",
                }}
                activeOpacity={0.7}
              >
                <FontAwesome5
                  name="city"
                  size={18}
                  color="rgba(255, 130, 67, 1)"
                />
                <View style={styles.item}>
                  <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                  {item.admin1 && <Text>{` ${item.admin1}`}</Text>}
                  {item.country && <Text>{`, ${item.country}`}</Text>}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
          />
        </View>
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
  dropdownContainer: {
    marginTop: 10,
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
    position: "absolute",
    width: "100%",
    top: 40,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    display: "flex",
    flexDirection: "row",
  },
});

export default Dropdown;
