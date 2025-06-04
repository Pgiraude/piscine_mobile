import { City } from "@/hooks/useCityAutocomplete";
import { useState } from "react";
import {
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import useCityAutocomplete from "@/hooks/useCityAutocomplete";
import useStore from "@/store/useStore";

const Dropdown = () => {
  const setCityInfos = useStore((state) => state.setCityInfos);
  const setIsGeoError = useStore((state) => state.setIsGeoError);

  const { results, fetchCities } = useCityAutocomplete();

  const [searchText, setSearchTextLocal] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChangeText = (text: string) => {
    setSearchTextLocal(text);
    setShowDropdown(true);
    if (text) fetchCities(text);
  };

  const onOptionPress = (option: City) => {
    setIsGeoError(false);
    setCityInfos(option);
    setSearchTextLocal("");
    setShowDropdown(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={handleChangeText}
        placeholder="Search..."
        onBlur={() => setShowDropdown(false)}
      />
      {showDropdown && results && results.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={results}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => onOptionPress(item)}>
                <Text style={styles.item}>
                  {item.name} {item.admin1}, {item.country}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
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
  dropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    zIndex: 1000,
    maxHeight: 200,
    elevation: 5, // ombre sur Android
    shadowColor: "#000", // ombre sur iOS
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
