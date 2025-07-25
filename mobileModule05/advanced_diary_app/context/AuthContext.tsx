import { AuthService } from "@/services/authService";
import {
	type FirebaseAuthTypes,
	getAuth,
	onAuthStateChanged,
} from "@react-native-firebase/auth";
import { router, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

export type AuthContextType = {
	user: FirebaseAuthTypes.User | null;
	login: (userInfos: FirebaseAuthTypes.User | null) => void;
	logout: () => void;
	initializing: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
	children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
	const [initializing, setInitializing] = useState(true);
	const segments = useSegments();

	useEffect(() => {
		const handleAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
			console.log(
				"Auth state changed:",
				user ? "User logged in" : "User logged out",
			);
			if (user) setUser(user);
			else setUser(null);
			if (initializing) setInitializing(false);
		};

		const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
		return subscriber;
	}, [initializing]);

	
	const login = (userInfos: FirebaseAuthTypes.User | null) => {
		console.log("Manual login called");
		setUser(userInfos);
	};
	
	const logout = async () => {
		console.log("Manual logout called ");
		console.log("Starting logout process...");
		await AuthService.signOut();
		console.log("AuthService.signOut completed");
	};

	useEffect(() => {
		if (initializing) {
			console.log("Still initializing, skipping navigation");
			return;
		}

		const inAuthGroup =
			segments[0] === "profile" || segments[0] === "(protected)";

		if (user && !inAuthGroup) {
			console.log("Redirecting to protected area");
			router.replace("/profile");
		} else if (!user && inAuthGroup) {
			console.log("Redirecting to login");
			router.replace("/");
		}
	}, [user, initializing, segments, logout]);

	return (
		<AuthContext.Provider value={{ user, login, logout, initializing }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
