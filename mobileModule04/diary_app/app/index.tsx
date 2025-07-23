import MyProfile from "@/components/MyProfil";
import NoteList from "@/components/notes/NoteList";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { AuthService } from "@/services/authService";
import {
	type FirebaseAuthTypes,
	getAuth,
	onAuthStateChanged,
} from "@react-native-firebase/auth";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Home = () => {
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
	const [initializing, setInitializing] = useState(true);

	useEffect(() => {
		const handleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
			setUser(user);
			if (initializing) setInitializing(false);
		};

		const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
		return subscriber;
	}, [initializing]);

	const handleLogout = async () => {
		try {
			await AuthService.signOut();
		} catch (error) {
			console.error("Erreur de déconnexion:", error);
		}
	};

	if (initializing)
		return (
			<View style={homeStyles.container}>
				<ActivityIndicator size="large" color="#fff" />
			</View>
		);

	if (!user || !user.email) {
		return (
			<View style={homeStyles.container}>
				<Text style={{ color: "#fff", fontSize: 40, textAlign: "center" }}>
					Bienvenue sur votre journal personnel
				</Text>
				<Link href="/login" push asChild>
					<LButton
						variant={LButtonVariant.GOOGLE}
						style={{ width: 200, marginTop: 20 }}
						onPress={() => {}}
					>
						Se connecter
					</LButton>
				</Link>
			</View>
		);
	}

	return (
		<View style={homeStyles.container}>
			<MyProfile user={user} logout={handleLogout} />
			<NoteList userId={user.uid} userEmail={user.email} />
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
