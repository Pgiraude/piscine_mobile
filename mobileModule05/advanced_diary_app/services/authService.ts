import {
	type FirebaseAuthTypes,
	GithubAuthProvider,
	GoogleAuthProvider,
	getAuth,
	signInAnonymously,
	signInWithCredential,
	signOut,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as WebBrowser from "expo-web-browser";

GoogleSignin.configure({
	webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
	iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
});

const RESULT_SUCCESS = "success";

export const AuthService = {
	async signInWithGoogle(): Promise<FirebaseAuthTypes.UserCredential | undefined> {
		try {
			await GoogleSignin.hasPlayServices();

			const signInResult = await GoogleSignin.signIn();

			const idToken = signInResult.data?.idToken;
			if (!idToken) {
				console.log("Connexion Google annulée par l'utilisateur.");
				return undefined;
			}
			const googleCredential = GoogleAuthProvider.credential(idToken);

			return signInWithCredential(getAuth(), googleCredential);
		} catch (error) {
			console.error("Erreur de connexion Google:", error);
			throw error;
		}
	},

	async exchangeGithubCodeForToken(code: string): Promise<string> {
		const response = await fetch(
			"https://github.com/login/oauth/access_token",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					client_id: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID,
					client_secret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET_ID,
					code: code,
				}),
			},
		);

		if (!response.ok) {
			throw new Error("Erreur lors de l'échange du code GitHub");
		}

		const data = await response.json();
		return data.access_token;
	},

	async signInWithGithub(): Promise<FirebaseAuthTypes.UserCredential | undefined> {
		try {
			const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}&scope=user:email&redirect_uri=diaryapp://`;

			const result = await WebBrowser.openAuthSessionAsync(
				githubAuthUrl,
				"diaryapp://",
			);

			if (result.type === RESULT_SUCCESS) {
				const { url } = result;
				const code = new URL(url).searchParams.get("code");

				if (code) {
					const accessToken =
						await AuthService.exchangeGithubCodeForToken(code);
					const githubCredential = GithubAuthProvider.credential(accessToken);
					return signInWithCredential(getAuth(), githubCredential);
				}
			}

			console.log("Connexion GitHub annulée par l'utilisateur.");
			return undefined;
		} catch (error) {
			console.error("Erreur de connexion GitHub:", error);
			throw error;
		}
	},

	async signInAnonymously(): Promise<FirebaseAuthTypes.UserCredential> {
		try {
			return await signInAnonymously(getAuth());
		} catch (error) {
			console.error("Erreur de connexion anonyme:", error);
			throw error;
		}
	},

	async signOut(): Promise<void> {
		try {
			await GoogleSignin.signOut();
			await signOut(getAuth());
		} catch (error) {
			console.error("Erreur de déconnexion:", error);
			throw error;
		}
	},

	async isSignedIn(): Promise<boolean> {
		try {
			const currentUser = await GoogleSignin.getCurrentUser();
			const githubUser = await GithubAuthProvider.getCurrentUser();
			return !!currentUser || !!githubUser;
		} catch (error) {
			console.error("Erreur lors de la vérification de connexion:", error);
			return false;
		}
	},
};
