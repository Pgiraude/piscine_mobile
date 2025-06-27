import { StyleSheet } from "react-native";

const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 40,
  },
  scrollCardContainer: {
    borderRadius: 20,
    minWidth: 260,
    width: "100%",
  },
  scrollCard: {
    borderRadius: 20,
    padding: 28,
    elevation: 8,
  },
  card: {
    backgroundColor: "rgba(42, 32, 56, 1)",
    borderRadius: 20,
    padding: 28,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  city: {
    fontSize: 26,
    fontWeight: "bold",
    color: "rgb(2, 48, 71)",
    marginLeft: 8,
  },
  region: {
    fontSize: 16,
    color: "rgb(142, 202, 230)",
    fontWeight: "600",
    marginBottom: 2,
  },
  country: {
    fontSize: 16,
    color: "rgb(48, 215, 255)",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    fontSize: 18,
    color: "rgba(255, 130, 67, 1)",
    marginRight: 4,
  },
  value: {
    color: "#fff",
    fontSize: 15,
  },
  temp: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 2,
  },
  weather: {
    fontSize: 16,
    color: "#fff",
    fontStyle: "italic",
    marginBottom: 2,
  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    fontSize: 60,
    fontWeight: "bold",
    color: "rgba(255, 154, 80, 1)",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 30,
    color: "rgba(160, 160, 192, 1)",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default customStyles;
