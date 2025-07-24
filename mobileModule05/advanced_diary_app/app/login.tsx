import LButton, { LButtonVariant } from "@/design-system/LButton";
import { AuthService } from "@/services/authService";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

const Login = () => {
	const [loading, setLoading] = useState(false);
	const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

	const handleGoogleLogin = async () => {
		try {
			setLoadingProvider("google");
			setLoading(true);

			await AuthService.signInWithGoogle();
			console.log("Connexion Google réussie");
			router.replace("/profile");
		} catch (error) {
			console.error("Erreur de connexion Google:", error);
			Alert.alert(
				"Erreur de connexion",
				"Impossible de se connecter avec Google. Veuillez réessayer.",
			);
		} finally {
			setLoading(false);
			setLoadingProvider(null);
		}
	};

	const handleGithubLogin = async () => {
		try {
			setLoadingProvider("github");
			setLoading(true);

			await AuthService.signInWithGithub();
			console.log("Connexion GitHub réussie");
			router.replace("/profile");
		} catch (error) {
			console.error("Erreur de connexion GitHub:", error);
			Alert.alert(
				"Erreur de connexion",
				"Impossible de se connecter avec GitHub. Veuillez réessayer.",
			);
		} finally {
			setLoading(false);
			setLoadingProvider(null);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				paddingHorizontal: 20,
			}}
		>
			<View style={{ marginBottom: 40, alignItems: "center" }}>
				<Text
					style={{
						color: "#fff",
						fontSize: 32,
						fontWeight: "bold",
						marginBottom: 10,
					}}
				>
					Bienvenue
				</Text>
				<Text
					style={{
						color: "#fff",
						fontSize: 16,
						textAlign: "center",
						opacity: 0.8,
					}}
				>
					Connectez-vous pour accéder à votre journal personnel
				</Text>
			</View>
			<View style={{ width: "100%", maxWidth: 300, gap: 20 }}>
				<LButton variant={LButtonVariant.GOOGLE} onPress={handleGoogleLogin}>
					{loading && loadingProvider === "google" ? (
						<ActivityIndicator size="small" color="#fff" />
					) : (
						<Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
							Continuer avec Google
						</Text>
					)}
				</LButton>
				<LButton variant={LButtonVariant.GITHUB} onPress={handleGithubLogin}>
					{loading && loadingProvider === "github" ? (
						<ActivityIndicator size="small" color="#fff" />
					) : (
						<Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
							Continuer avec GitHub
						</Text>
					)}
				</LButton>
				<LButton
					variant={LButtonVariant.CANCEL}
					onPress={() => router.replace("/")}
					style={{ marginTop: 30 }}
				>
					<Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
						Retour à l'accueil
					</Text>
				</LButton>
			</View>
		</View>
	);
};

export default Login;
