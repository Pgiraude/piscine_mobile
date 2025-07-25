import { useAuth } from "@/context/AuthContext";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { router } from "expo-router";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Home = () => {
	const { initializing, user } = useAuth() || {};

	if (initializing) {
		return (
			<View style={homeStyles.container}>
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);
	}

	return (
		<View style={homeStyles.container}>
			<Text style={{ color: "#fff", fontSize: 40, textAlign: "center" }}>
				Bienvenue sur votre journal personnel
			</Text>
			{user ? (
				<LButton
					variant={LButtonVariant.GOOGLE}
					style={{ width: 200, marginTop: 20, alignItems: "center", justifyContent: "center" }}
					onPress={() => {
						router.replace("/profile");
					}}
				>
					Accéder à mon journal
				</LButton>
			) : (
				<LButton
					variant={LButtonVariant.GOOGLE}
					style={{ width: 200, marginTop: 20 }}
					onPress={() => {
						router.replace("/login");
					}}
				>
					Se connecter
				</LButton>
			)}
		</View>
	);
};

export default Home;

const homeStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
});
